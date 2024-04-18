
export const PRODUCT_CATEGORIS = [
  {
    label: "UI Kits",
    value: "ui_kits" as const,
    featured: [
      {
        name: "Editor picks",
        href: "#",
        imageSrc: '/nav/ui-kits/mixed.jpg'
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: '/nav/ui-kits/mixed.jpg'
      },
      {
        name: "Bestsellers",
        href: "#",
        imageSrc: '/nav/ui-kits/purple.jpg'
      },
    ]
  },
  {
    label: "Icons",
    value: "icons" as const,
    featured: [
      {
        name: "Favorite Icons Picks",
        href: "#",
        imageSrc: '/nav/icons/picks.jpg'
      },
      {
        name: "New Arrivals",
        href: "#",
        imageSrc: '/nav/icons/new.jpg'
      },
      {
        name: "Bestselling Icons",
        href: "#",
        imageSrc: '/nav/icons/bestsellers.jpg'
      },
    ]
  },
]

export const ORDERS = [
  {
    id: "ORD1234",
    date: "2021-05-01",
    total: 102.96,
    status: "Delivered",
    customer: 'Ryan',
    product:
    {
      id: "PROD001",
      name: "UI Kit",
      price: 102.96,
      quantity: 1,
      imageSrc: "/nav/ui-kits/mixed.jpg",
    },

  },
  {
    id: "ORD12345",
    date: "2021-05-02",
    total: 102.96,
    status: "Delivered",
    customer: 'Ryan',
    product:
    {
      id: "PROD002",
      name: "UI Kit",
      price: 102.96,
      quantity: 1,
      imageSrc: "/nav/ui-kits/mixed.jpg",
    },

  },
  {
    id: "ORD123456",
    date: "2021-05-03",
    total: 102.96,
    status: "Pending",
    customer: 'Fakid',
    product:
    {
      id: "PROD003",
      name: "UI Kit",
      price: 102.96,
      quantity: 1,
      imageSrc: "/nav/ui-kits/mixed.jpg",
    },

  },
]