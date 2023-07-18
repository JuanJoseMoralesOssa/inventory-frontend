export namespace ConfigSideMenu {
  export const listMenus = [
    {
      id: "640e0cf85e42613f78309e4c",
      route: "/parameters/list-client",
      icon:"<i class='material-icons'>cloudclient</i>",
      text: "Clientes",
      component: () => import('../modules/parameters/client/list-client/list-client.component').then(it => it.ListClientComponent),
    },
    {
      id: "640e0d055e42613f78309e4d",
      route: "/parameters/list-packing",
      icon:"<i class='material-icons'>cloudpacking</i>",
      text: "Empaques",
      component: () => import('../modules/parameters/packing/list-packing/list-packing.component').then(it => it.ListPackingComponent),
    },
    {
      id: "642c36f3a4c7961414082956",
      route: "/parameters/list-product",
      icon:"<i class='material-icons'>cloudproduct</i>",
      text: "Productos",
      component: () => import('../modules/parameters/product/list-product/list-product.component').then(it => it.ListProductComponent),
    },
    {
      id: "642c37a0a4c7961414082958",
      route: "/sales/list-bill",
      icon:"<i class='material-icons'>cloudfacturas</i>",
      text: "Facturas",
      component: () => import('../modules/sales/bill/list-bill/list-bill.component').then(it => it.ListBillComponent),
    },
    {
      id: "642c37a0a4c7961414082958",
      route: "/sales/list-remission",
      icon:"<i class='material-icons'>cloudremission</i>",
      text: "Remisiones",
      component: () => import('../modules/sales/remission/list-remission/list-remission.component').then(it => it.ListRemissionComponent),
    },
    {
      id: "642c376ea4c7961414082957",
      route: "/sales/list-sale",
      icon:"<i class='material-icons'>cloudSales</i>",
      text: "Ventas",
      component: () => import('../modules/sales/sale/list-sale/list-sale.component').then(it => it.ListSaleComponent),
    },
    // {
    //   id: "6483f3acb23165de1973d155",
    //   route: "/params/city-list",
    //   icon:"<i class='material-icons'>cloudCiudades</i>",
    //   text:"Ciudades"
    // },
    // {
    //   id: "6483f3c6b23165de1973d156",
    //   route: "/params/department-list",
    //   icon:"<i class='material-icons'>cloudDepartamentos</i>",
    //   text:"Departamentos"
    // },
    // {
    //   id: "648523b31581b16be8edbddc",
    //   route: "/params/request-type-list",
    //   icon:"<i class='material-icons'>cloudDepartamentos</i>",
    //   text:"Tipos de solicitud"
    // },
    // {
    //   id: "642c384fa4c796141408295a",
    //   route: "/params/client-list",
    //   icon:"<i class='material-icons'>cloudDepartamentos</i>",
    //   text:"Clientes"
    // },
    // {
    //   id: "642c37cca4c7961414082959",
    //   route: "/params/comment-list",
    //   icon:"<i class='material-icons'>cloudSolicitudes</i>",
    //   text:"Comentarios"
    // },
    // {
    //   id: "6483ef20b23165de1973d152",
    //   route: "/params/real-state-list",
    //   icon:"<i class='material-icons'>cloudDepartamentos</i>",
    //   text:"Inmobiliarias"
    // },
  ];
}
