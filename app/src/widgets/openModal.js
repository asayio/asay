export default function openModal(modalid) {
    const modal = document.getElementById(modalid);
    modal.classList.remove('dn');
    modal.classList.add('flex');
    const body = document.body;
    body.classList.add('overflow-hidden');
  }
