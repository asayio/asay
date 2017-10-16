export function openBurgerMenu() {
  const burgerMenu = document.getElementById('burger-list');
  burgerMenu.classList.remove('dn');
  const menuIcon = document.getElementById('menu-icon');
  menuIcon.classList.add('dn');
  const closeIcon = document.getElementById('close-icon');
  closeIcon.classList.remove('dn');
};

export function closeBurgerMenu() {
  const modal = document.getElementById('burger-list');
  modal.classList.add('dn');
  const menuIcon = document.getElementById('menu-icon');
  menuIcon.classList.remove('dn');
  const closeIcon = document.getElementById('close-icon');
  closeIcon.classList.add('dn');
};
