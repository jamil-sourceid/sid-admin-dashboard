export interface SideBarprops {
  toggleSidebar: (success: boolean) => void;
  isCollapsed: boolean;
}

export type MenuItemType = 'link' | 'dropdown';

export interface SubMenuItem {
  key: string;
  title: string;
  path: string;
  permissions?: string[];
}

export interface MenuItem {
  key: string;
  title: string;
  icon: string;
  path?: string; // Optional because dropdowns won't have a direct path
  type: MenuItemType;
  hidden?: boolean; // Optional flag for hiding menu items
  items: SubMenuItem[]; // Only present if type === 'dropdown'
}
