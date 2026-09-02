const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim();
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();

export const ANALYTICS_CONSENT_KEY = 'kaka_analytics_consent_v1';

let initialized = false;

function loadScript(src, id) {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function initializeMetaPixel() {
  if (!META_PIXEL_ID || window.fbq) return;

  const fbq = function (...args) {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
    else fbq.queue.push(args);
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  loadScript('https://connect.facebook.net/en_US/fbevents.js', 'meta-pixel-script');
  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

function initializeGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`, 'google-analytics-script');
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
}

export function initializeAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  initializeMetaPixel();
  initializeGoogleAnalytics();
}

function productId(product) {
  return product.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function priceNumber(product) {
  return Number(product.price.replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
}

function itemPayload(product) {
  return {
    item_id: productId(product),
    item_name: product.name,
    item_brand: 'Kaká Lacerda',
    item_category: product.category,
    price: priceNumber(product),
    quantity: 1,
  };
}

export function trackProductView(product) {
  if (!product) return;
  const value = priceNumber(product);

  window.fbq?.('track', 'ViewContent', {
    content_ids: [productId(product)],
    content_name: product.name,
    content_category: product.category,
    content_type: 'product',
    currency: 'BRL',
    value,
  });

  window.gtag?.('event', 'view_item', {
    currency: 'BRL',
    value,
    items: [itemPayload(product)],
  });
}

export function trackWhatsAppClick({ source, product }) {
  const eventData = {
    contact_method: 'WhatsApp',
    source,
    ...(product ? {
      content_name: product.name,
      content_category: product.category,
      currency: 'BRL',
      value: priceNumber(product),
    } : {}),
  };

  window.fbq?.('track', 'Contact', eventData);
  window.fbq?.('trackCustom', 'WhatsAppClick', eventData);
  window.gtag?.('event', 'generate_lead', eventData);
  window.gtag?.('event', 'whatsapp_click', eventData);
}

export function analyticsStatus() {
  return {
    metaConfigured: Boolean(META_PIXEL_ID),
    googleConfigured: Boolean(GA_MEASUREMENT_ID),
  };
}
