import { DataMockType } from "@/app/types";

export const mockInitialData: DataMockType = {
  id: "1",
  createdAt: "2022-05-03T19:36:52.097Z",
  updatedAt: "2022-05-03T19:36:52.097Z",
  name: "Funil Teste",
  active: true,
  steps: [
    {
      id: "1",
      createdAt: "2022-05-03T19:36:52.097Z",
      updatedAt: "2022-05-03T19:36:52.097Z",
      funnelId: "1",
      name: "Upsell",
      productSellGroupId: "1",
      offerId: null,
      slug: "https://www.exempla.com/upsell/",
      up: 3,
      down: 2,
      order: 1
    },
    {
      id: "2",
      createdAt: "2022-05-03T19:36:52.097Z",
      updatedAt: "2022-05-03T19:36:52.097Z",
      funnelId: "1",
      name: "Downsell",
      productSellGroupId: "2",
      offerId: null,
      slug: "https://www.exempla.com/downsell/",
      up: 3,
      down: 3,
      order: 2
    },
    {
      id: "3",
      createdAt: "2022-05-03T19:36:52.097Z",
      updatedAt: "2022-05-03T19:36:52.097Z",
      funnelId: "1",
      name: "Nutricional",
      productSellGroupId: "3",
      offerId: null,
      slug: "https://www.exempla.com/nutricional/",
      up: 4,
      down: 4,
      order: 2
    },
    {
      id: "4",
      createdAt: "2022-05-03T19:36:52.097Z",
      updatedAt: "2022-05-03T19:36:52.097Z",
      funnelId: "1",
      name: "Obrigado",
      productSellGroupId: null,
      offerId: null,
      slug: "https://www.exempla.com/obrigado/",
      up: null,
      down: null,
      order: 3
    },
  ]
}