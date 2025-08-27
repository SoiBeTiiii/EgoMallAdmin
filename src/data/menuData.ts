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
    pageId: 1,
    name:"",
    links: [
      { pageId: 1, name: "Account management", label: "Quản lí tài khoản", link: "569re3pt0f" },
      { pageId: 2, name: "Category management", label: "Quản lý danh mục", link: "am7u4vy7yv" },
      { pageId: 3, name: "Products management", label: "Quản lý sản phẩm", link: "kep33um7fa" },
      // { pageId: 5, name: "Order management", label: "Quản lý brands", link: "ibdt9veg94" },
      { pageId: 6, name: "Coupon management", label: "Quản lý coupouns", link: "coupon" },
      { pageId: 8, name: "Order management", label: "Quản lý đơn hàng", link: "mnxwdc651m" },
      { pageId: 12, name: "Review management", label: "Quản lý đánh giá", link: "review" },
      { pageId: 11, name: "Blog management", label: "Quản lý blog", link: "blog" },
      { pageId: 121, name: "promotions management", label: "Quản lý khuyễn mại", link: "khuyenmai" },
      { pageId: 9, name: "Variant management", label: "Quản lý variant", link: "variant"},
    ],
  },
  {
    pageId: 2,
    name: "Quản lý người dùng",
    label: "Quản lý người dùng",
    links: [
      { pageId: 4, name: "Shipping method", label: "Phương thức giao hàng", link: "k8gyh3atv7" },
      { pageId: 10, name: "System setting", label: "Cài đặt hệ thống", link: "system" },
      { pageId: 13, name: "Role management", label: "Quản lý quyền", link: "role" },
    ],
  }
];
