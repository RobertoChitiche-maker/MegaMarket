import { useState } from "react";
import ProductCard from "../components/ProductCard";

export const productsByCategory = [
  {
    category: "Computadores",
    products: [
      {
        id: 1,
        name: "MacBook Pro 16",
        price: "110.000,00",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202410?wid=600&hei=400&fmt=jpeg&qlt=90",
          "https://fdn2.gsmarena.com/vv/pics/apple/apple-macbook-pro-16-2023-1.jpg",
          "https://m.media-amazon.com/images/I/61fd2oCrvyL._AC_SL1500_.jpg",
        ],
        description:
          "Tela Liquid Retina XDR de 16 polegadas. Chip Apple Silicon de alto desempenho. CPU e GPU integradas para tarefas profissionais. Memória unificada de alta velocidade. Ideal para edição de vídeo, programação e design.",
      },
      {
        id: 2,
        name: "MacBook Air M2",
        price: "78.000,00",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=600&hei=400&fmt=jpeg&qlt=90",
          "https://m.media-amazon.com/images/I/719C6bJv8jL._AC_SL1500_.jpg",
          "https://fdn2.gsmarena.com/vv/pics/apple/apple-macbook-air-13-2022-1.jpg",
        ],
        description:
          "Chip Apple M2. Tela Liquid Retina de 13 polegadas. Design fino e leve. Câmera FaceTime HD. Bateria de longa duração.",
      },
      {
        id: 3,
        name: "HP Pavilion 15",
        price: "38.500,00",
        images: [
          "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08250373.png",
          "https://m.media-amazon.com/images/I/71rdt7LqZPL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/81GrCeuCzxL._AC_SL1500_.jpg",
        ],
        description:
          "Tela de 15,6 polegadas. Processador Intel Core ou AMD Ryzen conforme versão. Memória RAM expansível conforme modelo. Armazenamento SSD. Indicado para estudo, escritório e navegação.",
      },
      {
        id: 4,
        name: "Dell XPS 13",
        price: "85.000,00",
        images: [
          "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/uber/0407-2023-xps-13-9320-nt-gallery-1.psd?fmt=jpg&wid=600&hei=400",
          "https://m.media-amazon.com/images/I/71F-Wcriq4L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61LxA4kX0eL._AC_SL1500_.jpg",
        ],
        description:
          "Tela compacta de alta resolução. Processadores Intel Core de alto desempenho. Armazenamento SSD. Design premium em alumínio. Portátil fino para produtividade profissional.",
      },
      {
        id: 5,
        name: "Lenovo ThinkPad X1",
        price: "92.000,00",
        images: [
          "https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MzQyMzE2fGltYWdlL3BuZ3xoODcvaGZkLzE0MTk1NzUzNzUwNTU4LnBuZ3xhYjAzMTBmYjFhNjYwNDU2ZjkzODc2YTY3YjUzYzc0NGIyN2Y4MDc4ODZkZjFmNjJhMjgyNzFjYzM2MGRjOTIw/lenovo-thinkpad-x1-carbon-gen-11-hero.png",
          "https://m.media-amazon.com/images/I/61iJdPQBKHL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71U-31GwDGL._AC_SL1500_.jpg",
        ],
        description:
          "Linha empresarial ThinkPad. Construção resistente. Teclado profissional confortável. Armazenamento SSD. Recursos de segurança empresarial.",
      },
      {
        id: 6,
        name: "Asus ROG Strix",
        price: "125.000,00",
        images: [
          "https://dlcdnwebimgs.asus.com/gain/2f3431d2-4d7a-44ce-81c4-3b8e945f4c68/w800",
          "https://m.media-amazon.com/images/I/81GrCeuCzxL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71S4sIPFvBL._AC_SL1500_.jpg",
        ],
        description:
          "Linha gamer Republic of Gamers. Placa gráfica dedicada conforme versão. Tela com alta taxa de atualização. Sistema de refrigeração avançado. Indicado para jogos e criação de conteúdo.",
      },
      {
        id: 7,
        name: "Acer Aspire 5",
        price: "33.900,00",
        images: [
          "https://static-ecapac.acer.com/media/catalog/product/a/s/aspire-5-a515-57-sv-01.png",
          "https://m.media-amazon.com/images/I/71vvXGmdKWL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71WkDp--uqL._AC_SL1500_.jpg",
        ],
        description:
          "Tela de 15,6 polegadas. Processador Intel Core ou AMD Ryzen conforme versão. Armazenamento SSD. Wi-Fi integrado. Laptop económico para tarefas diárias.",
      },
      {
        id: 8,
        name: "iMac 24",
        price: "98.000,00",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-gallery-1?wid=600&hei=400&fmt=jpeg&qlt=90",
          "https://m.media-amazon.com/images/I/61I3VP6GLcL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_SL1500_.jpg",
        ],
        description:
          "Tela Retina 4.5K de 24 polegadas. Chip Apple Silicon. Câmera FaceTime HD. Sistema de som integrado. Computador all-in-one fino e moderno.",
      },
      {
        id: 9,
        name: "Monitor Samsung Odyssey",
        price: "29.500,00",
        images: [
          "https://images.samsung.com/is/image/samsung/p6pim/africa_en/ls32cg552emxue/gallery/africa-en-odyssey-g5-g55c-ls32cg552emxue-536479174?$650_519_PNG$",
          "https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/81Dd0GgNTUL._AC_SL1500_.jpg",
        ],
        description:
          "Monitor gamer curvo. Resolução conforme versão. Alta taxa de atualização. Tempo de resposta reduzido. Indicado para jogos e produtividade.",
      },
      {
        id: 10,
        name: "Teclado Logitech MX Keys",
        price: "8.500,00",
        images: [
          "https://resource.logitech.com/content/dam/logitech/en/products/keyboards/mx-keys-s/gallery/mx-keys-s-top-graphite-us.png",
          "https://m.media-amazon.com/images/I/61YI1y6h1LL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71wW34vI7rL._AC_SL1500_.jpg",
        ],
        description:
          "Teclado sem fio. Iluminação inteligente das teclas. Conexão Bluetooth ou receptor USB. Compatível com Windows e macOS. Bateria recarregável.",
      },
    ],
  },
  {
    category: "Smartphones",
    products: [
      {
        id: 11,
        name: "iPhone 15 Pro Max",
        price: "95.000,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
          "https://m.media-amazon.com/images/I/81Os1SDWpcL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg",
        ],
        description:
          "Tela Super Retina XDR OLED de 6,7 polegadas. Resolução 2796 x 1290 pixels. ProMotion até 120Hz. Chip A17 Pro. Sistema de câmera Pro. Conector USB-C.",
      },
      {
        id: 12,
        name: "iPhone 14 Pro Max",
        price: "72.000,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
          "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61nzPMNY8zL._AC_SL1500_.jpg",
        ],
        description:
          "Tela Super Retina XDR OLED de 6,7 polegadas. Resolução 2796 x 1290 pixels. ProMotion até 120Hz. Dynamic Island. Chip A16 Bionic. Sistema de câmera Pro.",
      },
      {
        id: 13,
        name: "Samsung Galaxy S24 Ultra",
        price: "88.000,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-0.jpg",
          "https://m.media-amazon.com/images/I/71CXhVhpM0L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71JLhofuYJL._AC_SL1500_.jpg",
        ],
        description:
          "Tela Dynamic AMOLED 2X. Tela de 6,8 polegadas. Câmera principal de 200 MP. S Pen integrada. Opções de armazenamento até 1 TB. Bateria de longa duração.",
      },
      {
        id: 14,
        name: "Samsung Galaxy A15",
        price: "12.500,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a15-4g-1.jpg",
          "https://m.media-amazon.com/images/I/71YtR3TP-BL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61s0ZzwzSCL._AC_SL1500_.jpg",
        ],
        description:
          "Tela Super AMOLED de 6,5 polegadas. Taxa de atualização de 90Hz. Câmera principal de 50 MP. Bateria de 5000 mAh. Carregamento rápido de 25W. Armazenamento até 256 GB conforme versão.",
      },
      {
        id: 15,
        name: "Xiaomi 14 Ultra",
        price: "84.000,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-1.jpg",
          "https://m.media-amazon.com/images/I/51NwE8wpFVL._AC_SL1000_.jpg",
          "https://m.media-amazon.com/images/I/61nZSGDPMWL._AC_SL1500_.jpg",
        ],
        description:
          "Tela AMOLED WQHD+ de 6,73 polegadas. Resolução 3200 x 1440. Taxa de atualização dinâmica até 120Hz. Brilho máximo até 3000 nits. Sistema de câmeras Leica. Processador Snapdragon topo de gama.",
      },
      {
        id: 16,
        name: "Redmi Note 13",
        price: "18.000,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-13-4g-1.jpg",
          "https://m.media-amazon.com/images/I/71VW8LmqqPL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61zuL8CUigL._AC_SL1500_.jpg",
        ],
        description:
          "Processador Snapdragon 685. CPU octa-core até 2,8GHz. GPU Adreno 610. Tela AMOLED. Câmera principal de alta resolução. Bateria de longa duração.",
      },
      {
        id: 17,
        name: "Tecno Camon 20",
        price: "16.500,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/tecno/tecno-camon-20-1.jpg",
          "https://m.media-amazon.com/images/I/61m7k8VzpkL._AC_SL1000_.jpg",
          "https://m.media-amazon.com/images/I/61fsu4dldjL._AC_SL1000_.jpg",
        ],
        description:
          "Tela AMOLED conforme versão. Câmera principal de alta resolução. Bateria de grande capacidade. Sistema Android. Indicado para fotos e redes sociais.",
      },
      {
        id: 18,
        name: "Infinix Hot 40",
        price: "14.700,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/infinix/infinix-hot-40-1.jpg",
          "https://m.media-amazon.com/images/I/61JQCViYzOL._AC_SL1000_.jpg",
          "https://m.media-amazon.com/images/I/71BKP2AkXLL._AC_SL1500_.jpg",
        ],
        description:
          "Tela grande para multimédia. Bateria de longa duração. Processador para uso diário. Câmera traseira múltipla. Sistema Android com interface XOS.",
      },
      {
        id: 19,
        name: "iPhone 13 normal",
        price: "39.000,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/huawei/huawei-nova-11-1.jpg",
          "https://m.media-amazon.com/images/I/51IfhGrqMaL._AC_SL1000_.jpg",
          "https://m.media-amazon.com/images/I/61l9ppRIiqL._AC_SL1000_.jpg",
        ],
        description:
          "Tela OLED conforme versão. Design fino e leve. Câmera frontal de alta resolução.  Indicado para fotografia e redes sociais.",
      },
      {
        id: 20,
        name: "Google Pixel 8",
        price: "64.000,00",
        images: [
          "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg",
          "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61nO5YRaAxL._AC_SL1500_.jpg",
        ],
        description:
          "Tela OLED. Chip Google Tensor. Câmeras com processamento computacional. Android puro. Recursos de inteligência artificial. Atualizações diretas da Google.",
      },
    ],
  },
  {
    category: "AirPods e Fones",
    products: [
      {
        id: 21,
        name: "AirPods Pro 2",
        price: "13.000,00",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=600&hei=400&fmt=jpeg&qlt=90",
          "https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_SL1500_.jpg",
        ],
        description:
          "Driver Apple personalizado de alta excursão. Cancelamento ativo de ruído. Modo Transparência Adaptativa. Áudio Espacial personalizado. Equalização adaptativa. Resistência IP54 no modelo USB-C.",
      },
      {
        id: 22,
        name: "AirPods 3",
        price: "10.500,00",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MME73?wid=600&hei=400&fmt=jpeg&qlt=90",
          "https://m.media-amazon.com/images/I/61ZRU9gnbxL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61jcsHsFN8L._AC_SL1500_.jpg",
        ],
        description:
          "Áudio Espacial com rastreamento dinâmico da cabeça. Design sem fio. Estojo de carregamento. Sensor de força. Resistência a suor e água.",
      },
      {
        id: 23,
        name: "Samsung Galaxy Buds2 Pro",
        price: "8.750,00",
        images: [
          "https://m.media-amazon.com/images/I/61KVX-MbIUL._AC_SL1500_.jpg",
          "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-buds2-pro-1.jpg",
          "https://images.samsung.com/is/image/samsung/p6pim/africa_en/sm-r510nzaamea/gallery/africa-en-galaxy-buds2-pro-r510-sm-r510nzaamea-533187846?$650_519_PNG$",
        ],
        description:
          "Bluetooth 5.3. Cancelamento ativo de ruído. Áudio 360. Resistência à água IPX7. Até 5 horas de reprodução com ANC ligado. Estojo com carregamento adicional.",
      },
      {
        id: 24,
        name: "JBL Tune Buds",
        price: "5.900,00",
        images: [
          "https://m.media-amazon.com/images/I/61gLjv5ScyL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61lAFWgW7PL._AC_SL1500_.jpg",
          "https://mm.jbl.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw81407549/JBL_Tune_Buds_Product%20Image_Hero_Black.png",
        ],
        description:
          "Som JBL Pure Bass. Bluetooth 5.3. Cancelamento ativo de ruído. Smart Ambient. Até 48 horas de bateria. Resistência à água e poeira.",
      },
      {
        id: 25,
        name: "Sony WH-1000XM4",
        price: "22.000,00",
        images: [
          "https://m.media-amazon.com/images/I/61oqO1AMbdL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg",
          "https://www.sony.com.au/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=600",
        ],
        description:
          "Headphone sem fio over-ear. Cancelamento de ruído ativo. Bluetooth. Microfones para chamadas. Bateria de longa duração. Som premium Sony.",
      },
      {
        id: 26,
        name: "Logitech G435",
        price: "6.300,00",
        images: [
          "https://m.media-amazon.com/images/I/61k2L5aQO6L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71DovAjyUHL._AC_SL1500_.jpg",
          "https://resource.logitechg.com/content/dam/gaming/en/products/g435/g435-gallery-1-blue.png",
        ],
        description:
          "Headset gamer sem fio. Design leve. Microfones integrados. Compatível com PC, PlayStation e dispositivos Bluetooth. Som estéreo para jogos.",
      },
      {
        id: 27,
        name: "Xiaomi Redmi Buds 4",
        price: "3.800,00",
        images: [
          "https://m.media-amazon.com/images/I/51Fb1Cgty-L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/51FOu63qdbL._AC_SL1500_.jpg",
          "https://i02.appmifile.com/mi-com-product/fly-birds/redmi-buds-4-pro/PC/img01.png",
        ],
        description:
          "Fones Bluetooth sem fio. Cancelamento de ruído conforme versão. Estojo de carregamento. Bateria de longa duração. Design compacto.",
      },
      {
        id: 28,
        name: "Beats Studio Buds",
        price: "12.900,00",
        images: [
          "https://m.media-amazon.com/images/I/51bRSWrEc7L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61gj4KElbrL._AC_SL1500_.jpg",
          "https://www.beatsbydre.com/content/dam/beats/web/product/earbuds/studio-buds-plus/pdp/product-carousel/transparency/pc-studiobudsplus-transparent-case.png",
        ],
        description:
          "Fones sem fio compactos. Cancelamento ativo de ruído. Modo transparência. Compatível com iOS e Android. Estojo de carregamento.",
      },
      {
        id: 29,
        name: "Anker Soundcore Life P3",
        price: "7.500,00",
        images: [
          "https://m.media-amazon.com/images/I/61N3XG4zUwL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61jJYvNo3cL._AC_SL1500_.jpg",
          "https://cdn.shopify.com/s/files/1/0493/9834/9974/products/A3939011_TD01_V2.png",
        ],
        description:
          "Fones true wireless. Cancelamento ativo de ruído. Drivers dinâmicos. Estojo de carregamento. Aplicativo Soundcore.",
      },
      {
        id: 30,
        name: "Razer BlackShark V2",
        price: "9.500,00",
        images: [
          "https://m.media-amazon.com/images/I/61HgoWbV5GL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71R4cUq9zJL._AC_SL1500_.jpg",
          "https://assets2.razerzone.com/images/pnx.assets/a7695f73132290b2f8b10f224f39a91f/razer-blackshark-v2-x-hero.png",
        ],
        description:
          "Headset gamer. Drivers de alto desempenho. Microfone removível conforme versão. Almofadas confortáveis. Indicado para jogos competitivos.",
      },
    ],
  },
  {
    category: "TVs",
    products: [
      {
        id: 31,
        name: "Samsung Smart TV 55",
        price: "48.000,00",
        images: [
          "https://images.samsung.com/is/image/samsung/p6pim/africa_en/ua55cu7000uxxy/gallery/africa-en-crystal-uhd-cu7000-ua55cu7000uxxy-536098496?$650_519_PNG$",
          "https://m.media-amazon.com/images/I/71RxCmvnrbL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71LJJrKbezL._AC_SL1500_.jpg",
        ],
        description:
          "Tela LED de 55 polegadas. Resolução 4K 3840 x 2160. Crystal Processor 4K. Sistema Tizen Smart TV. HDR. Taxa de atualização de 60Hz.",
      },
      {
        id: 32,
        name: "LG OLED 65",
        price: "95.000,00",
        images: [
          "https://www.lg.com/content/dam/channel/wcms/us/images/tvs/oled65c3pua_aus_eaylljr/gallery/medium01.jpg",
          "https://m.media-amazon.com/images/I/81nC52jG8aL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71c-9ksGgTL._AC_SL1500_.jpg",
        ],
        description:
          "Tela OLED de 65 polegadas. Resolução 4K. Pretos profundos e alto contraste. Smart TV LG webOS. Ideal para cinema em casa.",
      },
      {
        id: 33,
        name: "TCL Android TV 43",
        price: "29.500,00",
        images: [
          "https://www.tcl.com/content/dam/tcl-dam/product/tv/p/p635/product/43-p635.png",
          "https://m.media-amazon.com/images/I/71W4MyjC5XL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71Hpd3Bv5IL._AC_SL1500_.jpg",
        ],
        description:
          "Tela LED de 43 polegadas. Resolução Full HD ou 4K conforme versão. Sistema Android TV. Acesso a aplicativos de streaming. Conectividade HDMI e USB.",
      },
      {
        id: 34,
        name: "Hisense 50 4K",
        price: "36.000,00",
        images: [
          "https://assets.hisense-usa.com/assets/ProductDownloads/488/6295fb7678/50A6H-front.png",
          "https://m.media-amazon.com/images/I/81aW25k-YCL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/81MrYQvB5RL._AC_SL1500_.jpg",
        ],
        description:
          "Tela de 50 polegadas. Resolução 4K UHD. Smart TV. Entradas HDMI e USB. Boa opção para filmes e séries.",
      },
      {
        id: 35,
        name: "Sony Bravia 55",
        price: "62.500,00",
        images: [
          "https://sony.scene7.com/is/image/sonyglobalsolutions/TVFY24_BRAVIA7_Front?$largeImage$",
          "https://m.media-amazon.com/images/I/81l+B9glYgL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/91fAU6mxFsL._AC_SL1500_.jpg",
        ],
        description:
          "Tela LED de 55 polegadas. Resolução 4K. Processamento de imagem Sony. Smart TV. Suporte a HDR conforme versão.",
      },
      {
        id: 36,
        name: "Xiaomi TV A Pro 43",
        price: "31.000,00",
        images: [
          "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-tv-a-pro-2025/pc/section01-img.png",
          "https://m.media-amazon.com/images/I/71dwkCWxmTL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/81LE7KBbaDL._AC_SL1500_.jpg",
        ],
        description:
          "Tela de 43 polegadas. Resolução 4K conforme versão. Smart TV Xiaomi. Google TV conforme modelo. Comando por voz.",
      },
      {
        id: 37,
        name: "Philips LED TV",
        price: "25.000,00",
        images: [
          "https://images.philips.com/is/image/philipsconsumer/55PUS7607_12-IMS-global?$jpglarge$&wid=600",
          "https://m.media-amazon.com/images/I/71oQhzzqSGL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/81ev3Bi7aML._AC_SL1500_.jpg",
        ],
        description:
          "Tela LED. Resolução conforme versão. Entradas HDMI e USB. Design fino. Indicada para uso doméstico.",
      },
      {
        id: 38,
        name: "LG Smart TV 32",
        price: "18.500,00",
        images: [
          "https://www.lg.com/content/dam/channel/wcms/us/images/tvs/32lq630bpub_aus_eaylljr/gallery/medium01.jpg",
          "https://m.media-amazon.com/images/I/71mi8vDzlDL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71uVPDrGhwL._AC_SL1500_.jpg",
        ],
        description:
          "Tela de 32 polegadas. Smart TV LG. Sistema webOS. Entradas HDMI e USB. Ideal para quartos e espaços pequenos.",
      },
      {
        id: 39,
        name: "Samsung QLED 75",
        price: "145.000,00",
        images: [
          "https://images.samsung.com/is/image/samsung/p6pim/africa_en/qa75q60cauxxy/gallery/africa-en-qled-q60c-qa75q60cauxxy-536113928?$650_519_PNG$",
          "https://m.media-amazon.com/images/I/81I9g3meQ-L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/81rS1ZyYH-L._AC_SL1500_.jpg",
        ],
        description:
          "Tela QLED de 75 polegadas. Resolução 4K. Tecnologia Quantum Dot. Smart TV Samsung Tizen. HDR. Ideal para cinema e jogos.",
      },
      {
        id: 40,
        name: "Epson Projector Full HD",
        price: "21.500,00",
        images: [
          "https://mediaserver.goepson.com/ImConvServlet/imconv/55edcc7caf67cb9aa16100f8f1ebcf4c3037a551/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=V11H974020_1",
          "https://m.media-amazon.com/images/I/61sGDFD5Q0L._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61I7wlNF6dL._AC_SL1500_.jpg",
        ],
        description:
          "Projetor Epson. Resolução Full HD conforme versão. Tecnologia de projeção 3LCD. Entradas HDMI. Indicado para apresentações e cinema em casa.",
      },
    ],
  },
  {
    category: "Relógios",
    products: [
      {
        id: 41,
        name: "Apple Watch Series 9",
        price: "32.000,00",
        images: [
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-case-unselect-gallery-1-202309?wid=600&hei=400&fmt=jpeg&qlt=90",
          "https://m.media-amazon.com/images/I/71D4RrNC1WL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71XMTLtZd5L._AC_SL1500_.jpg",
        ],
        description:
          "Chip S9 SiP. Tela Retina Always-On. Disponível em 41mm e 45mm. Resistência à água. Sensores de saúde e atividade. Compatível com iPhone.",
      },
      {
        id: 42,
        name: "Samsung Galaxy Watch6",
        price: "24.500,00",
        images: [
          "https://images.samsung.com/is/image/samsung/p6pim/africa_en/sm-r940nzkaafa/gallery/africa-en-galaxy-watch6-r940-sm-r940nzkaafa-537405835?$650_519_PNG$",
          "https://m.media-amazon.com/images/I/61ZjlBOp+rL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71C1xEd5LZL._AC_SL1500_.jpg",
        ],
        description:
          "Tela AMOLED. Sistema Wear OS com One UI Watch. Bluetooth 5.3. Sensores de saúde. Monitorização de sono e treino. Resistência à água conforme versão.",
      },
      {
        id: 43,
        name: "Xiaomi Smart Band 8",
        price: "5.500,00",
        images: [
          "https://i02.appmifile.com/mi-com-product/fly-birds/xiaomi-smart-band-8/pc/section01-img.png",
          "https://m.media-amazon.com/images/I/61MgsLmN+QL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61DD8mO+uDL._AC_SL1500_.jpg",
        ],
        description:
          "Tela AMOLED de 1,62 polegadas. Resistência à água 5ATM. Monitorização de frequência cardíaca. Monitorização de SpO2. Modos desportivos. Bateria de longa duração.",
      },
      {
        id: 44,
        name: "Huawei Watch GT",
        price: "18.700,00",
        images: [
          "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-gt-4/images/design/huawei-watch-gt-4-design-watch.png",
          "https://m.media-amazon.com/images/I/61S6ut2v9iL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61V4VnU9fNL._AC_SL1500_.jpg",
        ],
        description:
          "Tela AMOLED. Bateria de longa duração. Monitorização de saúde. Modos de treino. Design clássico.",
      },
      {
        id: 45,
        name: "Amazfit GTS",
        price: "11.900,00",
        images: [
          "https://us.amazfit.com/cdn/shop/products/gts4-mini-black.png",
          "https://m.media-amazon.com/images/I/61xhWkOPGWL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61lABnN7XPL._AC_SL1500_.jpg",
        ],
        description:
          "Tela AMOLED. Monitorização de batimentos cardíacos. Modos desportivos. GPS conforme versão. Bateria de longa duração.",
      },
      {
        id: 46,
        name: "Garmin Forerunner",
        price: "39.000,00",
        images: [
          "https://res.garmin.com/en/products/010-02810-00/v/cf-lg.jpg",
          "https://m.media-amazon.com/images/I/61Q3H3BvZWL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/71hYT8B6YNL._AC_SL1500_.jpg",
        ],
        description:
          "Relógio GPS para corrida. Monitorização de ritmo e distância. Planos de treino personalizados. Bateria até 2 semanas conforme modelo. Monitorização de frequência cardíaca.",
      },
      {
        id: 47,
        name: "Fitbit Versa",
        price: "17.500,00",
        images: [
          "https://www.fitbit.com/global/content/dam/fitbit/global/pdp/devices/versa-4/hero-static/versa4-black-3qtr.png",
          "https://m.media-amazon.com/images/I/61Kk5C8QZCL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61y4kzUJb0L._AC_SL1500_.jpg",
        ],
        description:
          "Smartwatch para saúde e fitness. Monitorização de sono. Monitorização de batimentos cardíacos. Modos de exercício. Notificações inteligentes.",
      },
      {
        id: 48,
        name: "Realme Watch",
        price: "7.800,00",
        images: [
          "https://image01.realme.net/general/20200518/1589799429943.png",
          "https://m.media-amazon.com/images/I/61cFaR7O-nL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61+5QfmP5mL._AC_SL1500_.jpg",
        ],
        description:
          "Tela colorida. Monitorização de frequência cardíaca. Modos desportivos. Notificações do telemóvel. Bateria recarregável.",
      },
      {
        id: 49,
        name: "Oraimo Smart Watch",
        price: "6.500,00",
        images: [
          "https://ng.oraimo.com/cdn/shop/files/OSW-32N-680-1.png",
          "https://m.media-amazon.com/images/I/61-NRzH6lqL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/51H5Em6edFL._AC_SL1000_.jpg",
        ],
        description:
          "Tela colorida. Monitorização de passos. Monitorização de frequência cardíaca. Notificações inteligentes. Modos desportivos.",
      },
      {
        id: 50,
        name: "Noise ColorFit",
        price: "8.200,00",
        images: [
          "https://www.gonoise.com/cdn/shop/files/1_d2aac2c5-00ca-48ca-88d7-a3a5a8d5f939.png",
          "https://m.media-amazon.com/images/I/61TapeOXotL._AC_SL1500_.jpg",
          "https://m.media-amazon.com/images/I/61EclBYcocL._AC_SL1500_.jpg",
        ],
        description:
          "Tela colorida. Monitorização de saúde. Modos desportivos. Notificações do telemóvel. Bateria recarregável.",
      },
    ],
  },
];

function Products() {
  const [search, setSearch] = useState("");

  const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
  const deletedProductIds =
    JSON.parse(localStorage.getItem("deletedProductIds")) || [];

  const normalProducts = productsByCategory
    .map((categoryGroup) => {
      const availableProducts = categoryGroup.products.filter(
        (product) => !deletedProductIds.includes(product.id)
      );

      return {
        ...categoryGroup,
        products: availableProducts,
      };
    })
    .filter((categoryGroup) => categoryGroup.products.length > 0);

  const adminProductsByCategory = adminProducts.reduce((acc, product) => {
    const categoryName = product.category || "Produtos adicionados";

    const existingCategory = acc.find((item) => item.category === categoryName);

    if (existingCategory) {
      existingCategory.products.push(product);
    } else {
      acc.push({
        category: categoryName,
        products: [product],
      });
    }

    return acc;
  }, []);

  const allProductsByCategory = [...normalProducts, ...adminProductsByCategory];

  const filteredCategories = allProductsByCategory
    .map((categoryGroup) => {
      const filteredProducts = categoryGroup.products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );

      return {
        ...categoryGroup,
        products: filteredProducts,
      };
    })
    .filter((categoryGroup) => categoryGroup.products.length > 0);

  return (
    <main>
      <div className="page-inner-content">
        <h3 className="sec-titulo">Todos os Produtos</h3>
        <div className="sbtitulo-underline"></div>

        <p className="products-intro">
          Explore os produtos disponíveis no MegaMarket, organizados por
          categoria para facilitar a sua compra.
        </p>

        <div className="product-search-box">
          <input
            type="text"
            placeholder="Pesquisar produto pelo nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && <button onClick={() => setSearch("")}>Limpar</button>}
        </div>

        {filteredCategories.length === 0 ? (
          <div className="empty-box">
            <p>Nenhum produto encontrado com esse nome.</p>
            <small>
              Tente pesquisar por outro nome, por exemplo: iPhone, Samsung,
              AirPods, TV ou MacBook.
            </small>
          </div>
        ) : (
          filteredCategories.map((categoryGroup) => (
            <section
              className="product-category-section"
              key={categoryGroup.category}
            >
              <h2 className="category-title">{categoryGroup.category}</h2>

              <div className="cls cls-4">
                {categoryGroup.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}

export default Products;