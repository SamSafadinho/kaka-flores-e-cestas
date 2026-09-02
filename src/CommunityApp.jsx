import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Menu,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import './community.css';
import {
  ANALYTICS_CONSENT_KEY,
  initializeAnalytics,
  trackProductView,
  trackWhatsAppClick,
} from './analytics';

const WHATSAPP = 'https://wa.me/5561982060828';
const INSTAGRAM = 'https://www.instagram.com/kakalacerdaflores/';
const LOCATION = 'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x935a33cf71db6e23:0x191889aeb09266b1?entry=s&sa=X&ved=1t%3A8290&hl=pt-br&ictx=111';

const products = [
  {
    name: 'Bouquet',
    category: 'Flores',
    catalogGroup: 'Flores',
    price: 'R$ 195,00',
    image: '/images/flores-rosa.jpg',
    summary: 'Flores e folhagens da semana em uma composição delicada e autoral.',
    details: ['Aproximadamente 18 hastes entre flores e folhagens', 'Papel especial e acabamento com fita de cetim', 'Composição feita com as flores disponíveis da semana'],
  },
  {
    name: 'Compota de Flores',
    category: 'Flores',
    catalogGroup: 'Flores',
    price: 'R$ 220,00',
    image: '/images/flores-verdes.jpg',
    summary: 'Um mix de flores da semana preparado em vaso, pronto para encantar.',
    details: ['Mix de flores frescas da semana', 'Composição em vaso', 'Cores e espécies variam conforme disponibilidade'],
  },
  {
    name: 'Flowers Box M',
    category: 'Flores',
    catalogGroup: 'Flores',
    price: 'R$ 320,00',
    image: '/images/colecao-capa.jpg',
    summary: 'Flores da semana em uma elegante caixa cartonada.',
    details: ['Caixa cartonada tamanho M', 'Flores frescas da semana', 'Consulte cores da caixa, paleta e espécies disponíveis'],
  },
  {
    name: 'Flor e Chocolate',
    category: 'Flores',
    catalogGroup: 'Flores',
    price: 'R$ 165,00',
    image: '/images/presente-romantico.jpg',
    summary: 'Uma dupla clássica para dizer carinho de um jeito doce e delicado.',
    details: ['Caixa de madeira', 'Vaso com flores', 'Caixa com 8 unidades de Ferrero Rocher'],
  },
  {
    name: 'Cesta Zerah',
    category: 'Cestas de café',
    catalogGroup: 'Café da manhã',
    price: 'R$ 398,00',
    image: '/images/cesta-artesanal.jpg',
    summary: 'Uma cesta que celebra recomeços, abundância e novos capítulos.',
    meaning: 'Zerah significa o início de uma nova linhagem ou de um novo período.',
    details: ['Caixa de madeira e flores secas e nobres em vaso âmbar', 'Suco de uva 250 ml, Drip Coffee e chá Ahmad', 'Uvas, pão campestre, pão 7 grãos zero lactose e bolo caseiro', 'Mix de castanhas, geleia e mozzarella de búfala'],
  },
  {
    name: 'Cesta Adamah',
    category: 'Cestas de café',
    catalogGroup: 'Café da manhã',
    price: 'R$ 297,00',
    image: '/images/cesta-romantica.jpg',
    summary: 'Sabores escolhidos para falar de cuidado, raízes e vida.',
    meaning: 'Adamah remete à terra, à fertilidade e à capacidade de sustentar a vida.',
    details: ['Caixa de madeira rústica e flores secas e nobres em vaso âmbar', 'Drip Coffee Orfeu, chá Ahmad e suco de uva integral Casa Madeira', 'Uvas, croissant de manteiga e pão 7 grãos zero lactose', 'Manteiga demi-sel, mix de nuts, geleia e mozzarella de búfala'],
  },
  {
    name: 'Café da Manhã Hortênsia',
    category: 'Cestas de café',
    catalogGroup: 'Café da manhã',
    price: 'R$ 345,00',
    image: '/images/cesta-siao.jpg',
    summary: 'Um café da manhã elegante, leve e cheio de afeto, acompanhado de flores.',
    details: ['Arranjo de hortênsias e flores da semana', 'Drip Coffee e chá Liberté', 'Suco de uva e geleia Casa Madeira', 'Queijo brie, uvas, ciabatta e croissant', 'Mix de nuts selecionado'],
  },
  {
    name: 'Cesta Cáspia',
    category: 'Cestas de café',
    catalogGroup: 'Café da tarde',
    price: 'R$ 396,00',
    image: '/images/cesta-romantica.jpg',
    summary: 'Um brinde delicado acompanhado de sabores para compartilhar.',
    details: ['Espumante Salton Fleur de Bulles', 'Uvas e geleia Casa Madeira', 'Ciabatta e croissant', 'Mix de nuts selecionado'],
  },
  {
    name: 'Cesta Me',
    category: 'Cestas de café',
    catalogGroup: 'Café da manhã',
    price: 'R$ 198,00',
    image: '/images/cesta-artesanal.jpg',
    summary: 'Um café da manhã acolhedor para presentear com simplicidade e carinho.',
    details: ['Caixa de madeira e ramalhete de flores', 'Drip Coffee, chá, suco Natural One e iogurte grego', 'Uvas, queijo minas frescal, bolo e pão amanteigado', 'Rosca com açúcar, pão 7 grãos, torradas e geleia'],
  },
  {
    name: 'Cesta Arabela',
    category: 'Cestas de café',
    catalogGroup: 'Café da manhã',
    price: 'R$ 298,00',
    image: '/images/cesta-siao.jpg',
    summary: 'Uma experiência completa de café da manhã para duas pessoas.',
    details: ['Cesto de taboa e bouquet com flores da semana', 'Bolo, pão artesanal, croissants e croissant de chocolate', 'Uvas, castanhas, queijo e salame', 'Drip Coffees, sucos e geleias para duas pessoas'],
  },
  {
    name: 'Cesta Luxo',
    category: 'Cestas de café',
    catalogGroup: 'Café da manhã',
    price: 'R$ 250,00',
    image: '/images/cesta-artesanal.jpg',
    summary: 'Uma seleção generosa para um café da manhã a dois.',
    details: ['Serve duas pessoas em caixa de madeira', 'Drip Coffees, chás Twinings, sucos e iogurtes gregos', 'Uvas, queijo minas, bolo, pães e rosca', 'Torradas importadas e ramalhete de flores'],
  },
  {
    name: 'Café da Manhã Poesia',
    category: 'Cestas de café',
    catalogGroup: 'Café da manhã',
    price: 'R$ 295,00',
    image: '/images/cesta-romantica.jpg',
    summary: 'Uma composição delicada para transformar a manhã em lembrança.',
    badge: 'Coleção sazonal',
    details: ['Drip Coffee, suco Casa Madeira e geleia St. Dalfour', 'Manteiga com flor de sal e mozzarella de búfala', 'Uvas, financiers, palmier e bolachinhas de leite', 'Croissant, ciabatta e castanhas'],
  },
  {
    name: 'Cesta Tina',
    category: 'Especiais',
    catalogGroup: 'Café da tarde',
    price: 'R$ 417,00',
    image: '/images/presente-romantico.jpg',
    summary: 'Uma celebração marcante com vinho, sabores e flores.',
    details: ['Tina de madeira e ramalhete de flores', 'Vinho ou espumante', 'Torrada especial, pão artesanal e castanhas', 'Queijo brie, salame e geleia Casa Madeira 150 g'],
  },
  {
    name: 'Cesta Bom Ânimo',
    category: 'Especiais',
    catalogGroup: 'Café da tarde',
    price: 'R$ 498,00',
    image: '/images/cesta-siao.jpg',
    summary: 'Uma cesta farta e elegante para celebrar os bons momentos.',
    details: ['Caixa de pinus e vinho', 'Azeite Rossio de Abrantes, queijo e salame', 'Pão artesanal, castanhas e azeitonas La Pastina', 'Geleia Casa Madeira 240 g'],
  },
  {
    name: 'Cesta Infantil',
    category: 'Especiais',
    catalogGroup: 'Datas comemorativas',
    price: 'R$ 267,00',
    image: '/images/colecao-capa.jpg',
    summary: 'Uma surpresa divertida e saborosa pensada para os pequenos.',
    details: ['Serve uma criança em caixa de madeira com topo de balão', 'Suco, Toddynho, Chambinho, mozzarella e uvas', 'Croissant, pain au chocolat, Oreo, Nutella e marshmallow', 'Adicional para uma segunda criança: R$ 136,00'],
  },
  {
    name: 'Cesta Aliança',
    category: 'Coleção Sião',
    catalogGroup: 'Café da tarde',
    price: 'R$ 459,00',
    image: '/images/colecao-siao.jpg',
    summary: 'Um presente que fala de compromisso, vínculo e presença fiel.',
    badge: 'Coleção sazonal',
    meaning: 'Berit ou brit significa aliança, pacto e compromisso fiel.',
    details: ['Caixa de madeira e palmeira-bambu', 'Malbec argentino', 'Queijo brie, salame italiano e pão campestre', 'Crostata de ervas finas, castanhas e geleia Casa Madeira'],
  },
  {
    name: 'Cesta Herança',
    category: 'Coleção Sião',
    catalogGroup: 'Datas comemorativas',
    price: 'R$ 279,00',
    image: '/images/colecao-capa.jpg',
    summary: 'Uma cesta que celebra tudo aquilo que deixamos no coração de alguém.',
    badge: 'Coleção sazonal',
    meaning: 'Nachalá significa herança e legado.',
    details: ['Caixa de madeira e palmeira-bambu', 'Suco de uva e Drip Coffee', 'Palitinhos de queijo, ciabatta, croissant e pain suisse', 'Crostata, uvas, cream cheese e geleia'],
  },
  {
    name: 'Cesta Refúgio',
    category: 'Coleção Sião',
    catalogGroup: 'Datas comemorativas',
    price: 'R$ 350,00',
    image: '/images/cesta-siao.jpg',
    summary: 'Sabores e detalhes escolhidos para transmitir proteção e acolhimento.',
    badge: 'Coleção sazonal',
    meaning: 'Machseh significa abrigo, proteção e lugar seguro.',
    details: ['Caixa de madeira e palmeira-bambu', 'Suco de uva, Drip Coffee, queijo brie e salame', 'Pão campestre, croissant, pain suisse, madeleines e crostata', 'Castanhas, uvas, cream cheese e geleia'],
  },
];

const catalogGroups = ['Todos', 'Café da manhã', 'Café da tarde', 'Flores', 'Datas comemorativas', 'Pronta entrega'];

const steps = [
  ['01', 'Escolha no catálogo', 'Conheça as opções, os valores e os detalhes de cada composição.'],
  ['02', 'Fale pelo WhatsApp', 'Ao escolher, você chega ao atendimento com o nome do produto já preenchido.'],
  ['03', 'Combine a entrega', 'Personalização, disponibilidade, pagamento e entrega são finalizados no WhatsApp.'],
];

const faqs = [
  ['Como faço um pedido?', 'Escolha um item no catálogo e toque em “Pedir pelo WhatsApp”. A mensagem chega com o produto selecionado e todo o restante é combinado no atendimento.'],
  ['Qual é o horário de atendimento?', 'Atendemos todos os dias, das 7h às 20h, pelo WhatsApp.'],
  ['Os preços incluem a entrega?', 'Não. A taxa de entrega é calculada conforme o endereço e informada no atendimento pelo WhatsApp.'],
  ['Vocês entregam em Brasília?', 'Sim. A entrega é combinada conforme o endereço, a data e a disponibilidade da rota em Brasília e região.'],
  ['Qual antecedência é recomendada?', 'Para ter mais opções de produtos e horários, recomendamos fazer o pedido com pelo menos 24 horas de antecedência. Em datas comemorativas, quanto antes, melhor.'],
  ['É possível pedir para o mesmo dia?', 'Sim, conforme os itens de pronta entrega e a disponibilidade da rota. Fale com a Kaká pelo WhatsApp para receber as opções atualizadas.'],
  ['É possível retirar o pedido?', 'Consulte a possibilidade de retirada pelo WhatsApp. Quando disponível, o local e o horário são confirmados durante o atendimento.'],
  ['Como acompanho as opções de pronta entrega?', 'A disponibilidade muda durante a semana. Abra a aba “Pronta entrega” e fale com a Kaká para receber as opções atualizadas do dia.'],
  ['Posso personalizar o presente?', 'Sim. Mensagem, estilo e composição podem ser alinhados no atendimento, respeitando a disponibilidade de flores e itens da semana.'],
  ['Os produtos estão sempre disponíveis?', 'As flores e alguns itens variam conforme a semana. Coleções sazonais e quantidades limitadas devem ser confirmadas pelo WhatsApp.'],
];

function whatsapp(message) {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function productMessage(product) {
  return `Olá, Kaká! Vi o catálogo no site e gostaria de pedir ${product.name} (${product.price}). Pode me confirmar a disponibilidade?`;
}

function WhatsAppLink({ href, source, product, children, ...props }) {
  return <a href={href} onClick={() => trackWhatsAppClick({ source, product })} {...props}>{children}</a>;
}

function WhatsAppIcon() {
  return <span className="whatsapp-brand-icon" aria-hidden="true"><img src="/images/whatsapp-symbol.png" alt="" /></span>;
}

function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand-light' : ''}`} href="#inicio" aria-label="Kaká Lacerda — início">
      <strong>Kaká Lacerda</strong>
      <small>flores &amp; cestas com história</small>
    </a>
  );
}

function InstagramGlyph() {
  return <span className="instagram-glyph" aria-hidden="true"><i /><b /></span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement"><a className="instagram-announcement" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Abrir o Instagram oficial da Kaká Lacerda"><span className="instagram-icon"><InstagramGlyph /></span><span>Instagram oficial: <strong>@kakalacerdaflores</strong></span></a><span className="announcement-separator">•</span><strong>Atendimento das 7h às 20h</strong></div>
      <header className="site-header">
        <div className="header-inner">
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>{open ? <X /> : <Menu />}</button>
          <Brand />
          <nav className={open ? 'nav-open' : ''} aria-label="Navegação principal">
            <a href="#catalogo" onClick={() => setOpen(false)}>Presentes</a>
            <a href="#servicos" onClick={() => setOpen(false)}>Assinaturas &amp; empresas</a>
            <a href="#entrega" onClick={() => setOpen(false)}>Entrega</a>
            <a href="#sobre" onClick={() => setOpen(false)}>Quem somos</a>
            <a href="#como-funciona" onClick={() => setOpen(false)}>Como pedir</a>
          </nav>
          <div className="header-actions">
            <a className="instagram-header-link" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Abrir o Instagram oficial da Kaká Lacerda"><span className="instagram-icon"><InstagramGlyph /></span><span>Instagram</span></a>
            <WhatsAppLink className="header-whatsapp" href={whatsapp('Olá, Kaká! Gostaria de ajuda para escolher um presente.')} source="cabecalho" target="_blank" rel="noreferrer"><WhatsAppIcon /><span>WhatsApp</span></WhatsAppLink>
          </div>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <main id="inicio">
      <section className="hero">
        <img className="hero-background" src="/images/cesta-artesanal.jpg" alt="Cesta artesanal Kaká Lacerda" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span>FLORES, CESTAS E AFETO</span>
          <h1>Presentes que<br />contam histórias.</h1>
          <p>Cada detalhe é pensado para transformar um gesto em uma memória inesquecível.</p>
          <a className="button button-light" href="#catalogo">Encontrar o presente perfeito</a>
        </div>
      </section>
      <section className="benefit-strip" aria-label="Diferenciais da Kaká">
        <article><Clock3 /><div><strong>Das 7h às 20h</strong><small>Atendimento pessoal pelo WhatsApp</small></div></article>
        <article><CalendarDays /><div><strong>Curadoria com cuidado</strong><small>Opções para diferentes ocasiões</small></div></article>
        <a className="benefit-delivery" href="#entrega"><Truck /><div><strong>Entrega combinada</strong><small>Veja região, taxa e prazos</small></div><ArrowRight size={16} /></a>
      </section>
    </main>
  );
}

function ProductModal({ product, onClose }) {
  const trackedProduct = useRef(null);

  useEffect(() => {
    if (!product) {
      trackedProduct.current = null;
      return undefined;
    }
    if (trackedProduct.current !== product.name) {
      trackedProduct.current = product.name;
      trackProductView(product);
    }
    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;
  return (
    <div className="product-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar detalhes"><X size={20} /></button>
        <div className="modal-image"><img src={product.image} alt={product.name} />{product.badge && <span>{product.badge}</span>}</div>
        <div className="modal-copy">
          <span className="product-category">{product.catalogGroup}</span>
          <h3 id="product-modal-title">{product.name}</h3>
          <strong className="modal-price">{product.price}</strong>
          <p className="modal-summary">{product.summary}</p>
          {product.meaning && <blockquote>{product.meaning}</blockquote>}
          <ul>{product.details.map((detail) => <li key={detail}><Check size={15} /> <span>{detail}</span></li>)}</ul>
          <WhatsAppLink className="button button-dark modal-order" href={whatsapp(productMessage(product))} source="detalhes_do_produto" product={product} target="_blank" rel="noreferrer">Pedir pelo WhatsApp <WhatsAppIcon /></WhatsAppLink>
          <small>Disponibilidade, personalização, pagamento e entrega são combinados no atendimento.</small>
        </div>
      </article>
    </div>
  );
}

function Catalog() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const visibleProducts = activeCategory === 'Todos' ? products : products.filter((product) => product.catalogGroup === activeCategory);

  return (
    <>
      <section className="catalog section" id="catalogo">
        <div className="catalog-top">
          <header className="store-heading"><span>CATÁLOGO KAKÁ</span><h2>{activeCategory === 'Todos' ? 'Nossos destaques' : activeCategory}</h2></header>
          <p>Escolha seu presente e finalize todos os detalhes diretamente com a Kaká pelo WhatsApp.</p>
        </div>
        <div className="catalog-toolbar" aria-label="Filtrar catálogo">
          {catalogGroups.map((category) => (
            <button className={activeCategory === category ? 'active' : ''} type="button" key={category} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>
        {activeCategory === 'Pronta entrega' ? (
          <div className="ready-delivery">
            <Sparkles size={24} />
            <div><span>PRONTA ENTREGA</span><h3>Veja o que está disponível hoje.</h3><p>As opções mudam durante a semana. Fale com a Kaká para receber as fotos e os valores atualizados.</p></div>
            <WhatsAppLink className="button button-dark" href={whatsapp('Olá, Kaká! Gostaria de ver as opções disponíveis para pronta entrega hoje.')} source="pronta_entrega" target="_blank" rel="noreferrer">Falar com a Kaká <WhatsAppIcon /></WhatsAppLink>
          </div>
        ) : <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <button className="product-image" type="button" onClick={() => setSelectedProduct(product)} aria-label={`Ver detalhes de ${product.name}`}>
                <img src={product.image} alt={product.name} />
                {product.badge && <span>{product.badge}</span>}
                <i>Ver detalhes</i>
              </button>
              <div className="product-copy">
                <span className="product-category">{product.catalogGroup}</span>
                <h3>{product.name}</h3>
                <strong>{product.price}</strong>
                <div className="product-actions">
                  <WhatsAppLink href={whatsapp(productMessage(product))} source="card_do_produto" product={product} target="_blank" rel="noreferrer">Pedir pelo WhatsApp <ArrowRight size={15} /></WhatsAppLink>
                </div>
              </div>
            </article>
          ))}
        </div>}
        <div className="catalog-note"><Sparkles size={15} /><span>Flores, cores e alguns itens variam conforme a disponibilidade. Confirme as opções atuais pelo WhatsApp.</span></div>
        <div className="catalog-footer"><p>Quer criar algo só seu?</p><WhatsAppLink href={whatsapp('Olá, Kaká! Vi o catálogo no site e gostaria de montar um presente personalizado.')} source="presente_personalizado" target="_blank" rel="noreferrer">Monte um presente personalizado <ArrowRight size={16} /></WhatsAppLink></div>
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      </section>
    </>
  );
}

function Services() {
  const services = [
    { icon: Heart, kicker: 'PARA TER SEMPRE POR PERTO', title: 'Assinatura Floral', text: 'Receba flores selecionadas pela Kaká com frequência combinada para renovar sua casa, consultório ou ambiente de trabalho.', message: 'Olá, Kaká! Gostaria de saber mais sobre a Assinatura Floral.' },
    { icon: Building2, kicker: 'PARA EMPRESAS', title: 'Presentes Corporativos', text: 'Presentes personalizados para clientes, equipes e datas importantes, com curadoria, acabamento e entrega combinada.', message: 'Olá, Kaká! Gostaria de saber mais sobre Presentes Corporativos.' },
  ];
  return (
    <section className="services section" id="servicos">
      <header className="store-heading"><span>EXPERIÊNCIAS KAKÁ</span><h2>Flores que permanecem.<br />Gestos que aproximam.</h2></header>
      <div className="service-grid">{services.map(({ icon: Icon, kicker, title, text, message }) => <article key={title}><div className="service-icon"><Icon /></div><span>{kicker}</span><h3>{title}</h3><p>{text}</p><WhatsAppLink href={whatsapp(message)} source={title === 'Assinatura Floral' ? 'assinatura_floral' : 'presentes_corporativos'} target="_blank" rel="noreferrer">Saiba mais <ArrowRight size={16} /></WhatsAppLink></article>)}</div>
    </section>
  );
}

function Story() {
  return (
    <section className="story" id="sobre">
      <img src="/images/flores-verdes.jpg" alt="Flores preparadas pela Kaká Lacerda" />
      <div className="story-shade" />
      <div className="story-copy">
        <span>NOSSA ESSÊNCIA</span>
        <h2>Kaká Lacerda</h2>
        <p>Cada presente que sai daqui carrega um olhar cuidadoso e uma curadoria feita para traduzir sentimentos. Flores, sabores e detalhes se encontram para ajudar você a dizer aquilo que o coração sente.</p>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">Conheça nossa história <ArrowRight size={16} /></a>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section" id="como-funciona">
      <header className="store-heading"><span>SIMPLES E PESSOAL</span><h2>Como fazer seu pedido</h2></header>
      <div className="steps">
        {steps.map(([number, title, text]) => <article key={number}><span>{number}</span><div className="step-icon">{number === '01' ? <Heart /> : number === '02' ? <WhatsAppIcon /> : <Truck />}</div><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  );
}

function ServiceInfo() {
  const deliveryItems = [
    { icon: Building2, title: 'Região atendida', text: 'Entregamos em Brasília e região. A disponibilidade da rota é confirmada a partir do endereço completo.' },
    { icon: Truck, title: 'Taxa de entrega', text: 'A taxa é calculada conforme o endereço e informada antes da finalização do pedido pelo WhatsApp.' },
    { icon: Clock3, title: 'Períodos de entrega', text: 'As entregas são organizadas por períodos e combinadas no atendimento. O horário depende da rota do dia.' },
    { icon: CalendarDays, title: 'Antecedência', text: 'Recomendamos pelo menos 24 horas para garantir mais opções. Em datas comemorativas, faça o pedido o quanto antes.' },
    { icon: Building2, title: 'Retirada', text: 'Consulte a disponibilidade de retirada. Quando possível, o local e o horário são confirmados pelo WhatsApp.' },
    { icon: Sparkles, title: 'Pedidos para o mesmo dia', text: 'São atendidos conforme a pronta entrega e a disponibilidade da rota. Chame a Kaká para ver as opções do dia.' },
  ];
  return <section className="service-info section" id="entrega" aria-label="Informações sobre entrega"><header className="store-heading"><span>ENTREGA SEM SURPRESAS</span><h2>Como funciona a entrega</h2><p>Veja as principais informações antes de escolher o presente.</p></header><div className="service-info-grid">{deliveryItems.map(({ icon: Icon, title, text }) => <article key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="service-info-notes"><span><Clock3 size={16} /><strong>Atendimento:</strong> todos os dias, das 7h às 20h</span><span><CalendarDays size={16} /><strong>Catálogo:</strong> opções confirmadas no atendimento</span></div><WhatsAppLink href={whatsapp('Olá, Kaká! Gostaria de confirmar a entrega para o meu endereço.')} source="informacoes_entrega" target="_blank" rel="noreferrer">Confirmar entrega com a Kaká <ArrowRight size={16} /></WhatsAppLink></section>;
}

function InstagramLife() {
  const moments = useMemo(() => [
    ['/images/flores-rosa.jpg', 'Flores', 'Arranjos, bouquets e flores da semana preparados pela Kaká em Brasília.'],
    ['/images/cesta-artesanal.jpg', 'Bastidores', 'Acompanhe a escolha dos itens e o cuidado presente em cada montagem.'],
    ['/images/presente-romantico.jpg', 'Rolou na semana', 'Veja as novidades, entregas e presentes que fizeram parte da nossa semana.'],
  ], []);
  return (
    <section className="testimonials section">
      <header className="store-heading instagram-heading"><span>ACOMPANHE A KAKÁ NO INSTAGRAM</span><h2>Inspirações para presentear</h2><p>Flores, bastidores e tudo o que rolou na semana.</p><a className="instagram-profile-link" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Seguir a Kaká Lacerda no Instagram"><span className="instagram-icon"><InstagramGlyph /></span> Seguir @kakalacerdaflores</a></header>
      <div className="social-grid">{moments.map(([image, title, text]) => <article className="social-card" key={title}><img src={image} alt="" /><div><span>NO INSTAGRAM</span><h3>{title}</h3><p>{text}</p><a href={INSTAGRAM} target="_blank" rel="noreferrer"><InstagramGlyph /> Ver publicação</a></div></article>)}</div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section className="faq section" id="contato">
      <div className="faq-intro"><span className="eyebrow">DÚVIDAS FREQUENTES</span><h2>Antes de<br /><em>presentear.</em></h2><p>Se a sua dúvida não estiver aqui, chame a gente. Será um prazer ajudar.</p><WhatsAppLink className="text-link" href={WHATSAPP} source="duvidas_frequentes" target="_blank" rel="noreferrer"><WhatsAppIcon /> Conversar no WhatsApp</WhatsAppLink></div>
      <div className="faq-list">{faqs.map(([question, answer], index) => <article className={active === index ? 'active' : ''} key={question}><button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><ChevronDown size={19} /></button><div><p>{answer}</p></div></article>)}</div>
    </section>
  );
}

function Footer({ onOpenPrivacy }) {
  return (
    <footer className="footer">
      <div className="footer-cta"><span>VAMOS CRIAR ALGO ESPECIAL?</span><h2>Seu presente começa<br />com uma história.</h2><WhatsAppLink className="button button-light" href={whatsapp('Olá, Kaká! Quero criar um presente com história.')} source="chamada_final" target="_blank" rel="noreferrer">Falar com a Kaká <ArrowRight size={18} /></WhatsAppLink></div>
      <div className="footer-info">
        <Brand light />
        <div><span>FALE COM A GENTE</span><WhatsAppLink href={WHATSAPP} source="rodape_telefone" target="_blank" rel="noreferrer">(61) 98206-0828</WhatsAppLink><small>Todos os dias, das 7h às 20h</small></div>
        <div><span>ENCONTRE-NOS</span><a href={LOCATION} target="_blank" rel="noreferrer">Águas Claras — Brasília, DF</a><small>Veja a rota no Google Maps</small></div>
        <div className="footer-instagram"><span>SIGA A KAKÁ</span><a href={INSTAGRAM} target="_blank" rel="noreferrer"><span className="instagram-icon"><InstagramGlyph /></span>@kakalacerdaflores</a><small>Instagram oficial</small></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Kaká Lacerda. Todos os direitos reservados.</span><button type="button" onClick={onOpenPrivacy}>Preferências de privacidade</button><span><ShieldCheck size={14} /> Atendimento seguro pelo WhatsApp</span></div>
    </footer>
  );
}

function ConsentBanner({ currentConsent, onChoose }) {
  if (currentConsent !== null) return null;
  return (
    <aside className="consent-banner" aria-label="Preferências de privacidade">
      <div>
        <strong>Sua privacidade importa</strong>
        <p>Usamos tecnologias opcionais para medir acessos, produtos visualizados e cliques no WhatsApp. Você pode aceitar ou recusar sem afetar o funcionamento do catálogo.</p>
      </div>
      <div className="consent-actions">
        <button type="button" className="consent-reject" onClick={() => onChoose('denied')}>Recusar</button>
        <button type="button" className="consent-accept" onClick={() => onChoose('granted')}>Aceitar medição</button>
      </div>
    </aside>
  );
}

function App() {
  const [consent, setConsent] = useState(() => localStorage.getItem(ANALYTICS_CONSENT_KEY));

  useEffect(() => {
    if (consent === 'granted') initializeAnalytics();
  }, [consent]);

  const chooseConsent = (choice) => {
    const previousConsent = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    localStorage.setItem(ANALYTICS_CONSENT_KEY, choice);
    setConsent(choice);
    if (choice === 'granted') initializeAnalytics();
    if (choice === 'denied' && previousConsent === 'granted') window.location.reload();
  };

  return <><Header /><Hero /><Catalog /><Services /><Story /><Process /><ServiceInfo /><InstagramLife /><FAQ /><Footer onOpenPrivacy={() => setConsent(null)} /><WhatsAppLink className="floating-whatsapp" href={whatsapp('Olá, Kaká! Vi o catálogo no site e gostaria de fazer uma encomenda.')} source="botao_flutuante" target="_blank" rel="noreferrer" aria-label="Encomendar pelo WhatsApp"><WhatsAppIcon /><span>Encomende pelo WhatsApp</span></WhatsAppLink><ConsentBanner currentConsent={consent} onChoose={chooseConsent} /></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
