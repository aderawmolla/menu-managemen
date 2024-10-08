import { atom } from 'recoil';
import treeDropdownData from "../constants/treeData";
export const menuState = atom({
  key: 'menuState',
  default: [],
});
export const sidebarState = atom({
  key: 'sidebarState',
  default: true, 
});


// Tree Data Atom
export const treeDataAtom = atom({
  key: "treeDataState",
  default: treeDropdownData,
});

// Form Data Atom
export const formDataAtom = atom({
  key: "formDataState",
  default: {
    menu_id: "",
    depth: 0,
    parent_data: "",
    name: "",
  },
});

// Button Text Atom
export const buttonTextAtom = atom({
  key: "buttonTextState",
  default: "Save",
});

// Collapse State Atom
export const isCollapseAtom = atom({
  key: "isCollapseState",
  default: false,
});
