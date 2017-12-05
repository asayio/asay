export function openDropDown() {
  const person = document.getElementById('person');
  const personalMenu = document.getElementById('personal-menu');
  personalMenu.classList.toggle('dn');
  person.classList.toggle('bg-near-white');
  person.classList.toggle('white');
  person.classList.toggle('bg-black-80');
}
