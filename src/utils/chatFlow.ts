import { WebsiteStore } from '../store/websiteStore';

interface ChatStep {
  question: string;
  processResponse: (response: string, store: WebsiteStore) => Promise<void>;
}

export const chatFlow: ChatStep[] = [
  {
    question: "Olá! Sou o assistente do SiteBuilder AI. Vou te ajudar a criar um site incrível! Para começar, qual é o nome do seu negócio?",
    processResponse: async (response, store) => {
      store.setBusinessName(response);
    }
  },
  {
    question: "Que ótimo nome! Agora me conte, qual é o tipo do seu negócio? Por exemplo: restaurante, loja de roupas, consultório médico...",
    processResponse: async (response, store) => {
      store.setBusinessType(response);
    }
  },
  {
    question: "Pode me contar um pouco mais sobre seu negócio? Qual é sua missão, valores e o que torna ele único?",
    processResponse: async (response, store) => {
      store.setBusinessDescription(response);
    }
  },
  {
    question: "Quem é seu público-alvo principal? Isso vai me ajudar a personalizar melhor o seu site para atrair os clientes certos.",
    processResponse: async (response, store) => {
      store.setTargetAudience(response);
    }
  },
  {
    question: "Quais são os principais objetivos que você quer alcançar com o site? Por exemplo: vender produtos, agendar serviços, divulgar informações...",
    processResponse: async (response, store) => {
      store.setWebsiteGoals(response);
    }
  },
  {
    question: "Que legal! Agora vamos deixar seu site com a cara do seu negócio. Você tem alguma preferência de cores? Me conte as cores que mais combinam com sua marca.",
    processResponse: async (response, store) => {
      store.setColorPreferences(response);
    }
  },
  {
    question: "Quais seções você gostaria de ter no seu site? Algumas opções populares são: Sobre, Serviços, Produtos, Galeria, Blog, Contato... Pode escolher várias!",
    processResponse: async (response, store) => {
      store.setSelectedSections(response);
    }
  },
  {
    question: "Ótimas escolhas! Agora preciso de algumas informações de contato. Qual é o melhor email para seus clientes entrarem em contato?",
    processResponse: async (response, store) => {
      store.setContactEmail(response);
    }
  },
  {
    question: "E qual é o melhor telefone para contato?",
    processResponse: async (response, store) => {
      store.setContactPhone(response);
    }
  },
  {
    question: "Qual é o endereço do seu negócio?",
    processResponse: async (response, store) => {
      store.setBusinessAddress(response);
    }
  },
  {
    question: "Você tem redes sociais? Se sim, pode me passar os links? (Facebook, Instagram, Twitter...)",
    processResponse: async (response, store) => {
      store.setSocialMedia(response);
    }
  },
  {
    question: "Qual é o horário de funcionamento do seu negócio?",
    processResponse: async (response, store) => {
      store.setBusinessHours(response);
    }
  },
  {
    question: "Você oferece algum diferencial competitivo? Por exemplo: entrega grátis, atendimento 24h, garantia estendida...",
    processResponse: async (response, store) => {
      store.setCompetitiveAdvantages(response);
    }
  },
  {
    question: "Você tem alguma promoção ou oferta especial que gostaria de destacar no site?",
    processResponse: async (response, store) => {
      store.setSpecialOffers(response);
    }
  }
];