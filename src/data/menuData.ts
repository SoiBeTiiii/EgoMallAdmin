import { I0LinkItem } from "@/components/Layouts/BasicAppShell/BasicAppShell";

export const menuData: I0LinkItem[] = [
  {
    pageId: 0,
    name: "Dashboard",
    label: "Dashboard",
    link: "dashboard",
  },
  {
    label: "Quản lý hệ thống",
    links: [
      { pageId: 1, name: "Account management", label: "Quản lí tài khoản", link: "569re3pt0f", status: "Prototype" },
      { pageId: 2, name: "Category management", label: "Quản lý danh mục", link: "am7u4vy7yv", status: "Prototype" },
      { pageId: 3, name: "Products management", label: "Quản lý sản phẩm", link: "kep33um7fa" },
      { pageId: 4, name: "Banner management", label: "Quản lý banners", link: "p1x0zur5dt" },
      { pageId: 5, name: "Order management", label: "Quản lý brands", link: "ibdt9veg94" },
      { pageId: 6, name: "Coupon management", label: "Quản lý coupouns", link: "wqk1jyz44k", status: "Prototype" },
      { pageId: 7, name: "promotions management", label: "Quản lý khuyễn mại", link: "bwjcibv0g4", status: "Prototype" },
    ],
  },
];
