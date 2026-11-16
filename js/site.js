/* CC PAX MANSIDAO — comportamentos leves. Funciona sem JavaScript no essencial. */
(function () {
  document.documentElement.classList.add('js');

  // Menu do celular
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      btn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });
  }

  // Sombra discreta no cabeçalho ao rolar
  var header = document.querySelector('.site-header');
  var onScroll = function () { if (header) header.classList.toggle('rolou', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Revelar seções ao rolar (uma vez). Quem prefere menos movimento vê tudo direto.
  var reduz = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revelar = document.querySelectorAll('.revelar');
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visivel'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revelar.forEach(function (el) { io.observe(el); });
  } else {
    revelar.forEach(function (el) { el.classList.add('visivel'); });
  }

  // Máscara de telefone: (77) 98100-6785
  document.querySelectorAll('input[data-tel]').forEach(function (inp) {
    inp.addEventListener('input', function () {
      var d = inp.value.replace(/\D/g, '').slice(0, 11);
      var r = d;
      if (d.length > 10) r = '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
      else if (d.length > 6) r = '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
      else if (d.length > 2) r = '(' + d.slice(0, 2) + ') ' + d.slice(2);
      inp.value = r;
    });
  });

  // Pedir confirmação antes de excluir
  document.querySelectorAll('form[data-confirm]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      if (!window.confirm(f.getAttribute('data-confirm'))) e.preventDefault();
    });
  });

  // Mostrar a imagem escolhida antes de salvar
  document.querySelectorAll('input[type="file"][data-preview]').forEach(function (inp) {
    inp.addEventListener('change', function () {
      var img = document.getElementById(inp.getAttribute('data-preview'));
      var f = inp.files && inp.files[0];
      if (img && f) { img.src = URL.createObjectURL(f); img.hidden = false; }
    });
  });
})();
