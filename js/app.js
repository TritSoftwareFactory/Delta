/**
 * DELTA RUGBY CLUB - CORE APPLICATION LOGIC
 * Control de navegación móvil, tabs de deportes, modales y matchday countdown
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMobileDock();
  initSmoothScroll();
  initSportsTabs();
  initMembershipCalculator();
  initRegistrationModal();
  initStickyHeader();
  initMobileHeroVideo();
});

/**
 * Mobile Drawer Menu
 */
function initMobileMenu() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileDock = document.getElementById('mobileDock');

  if (!openBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    if (backdrop) {
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
      backdrop.classList.add('opacity-100', 'pointer-events-auto');
    }
    if (mobileDock) {
      mobileDock.classList.add('dock-hidden');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
    if (backdrop) {
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    }
    if (mobileDock) {
      mobileDock.classList.remove('dock-hidden');
    }
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Mobile Dock: Animación de pastilla indicadora deslizante ultra-fluida (sin rebote ni retraso)
 */
function initMobileDock() {
  const dockPanel = document.querySelector('.mobile-dock-panel');
  if (!dockPanel) return;

  let indicator = dockPanel.querySelector('.mobile-dock-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'mobile-dock-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    dockPanel.prepend(indicator);
  }

  const items = Array.from(dockPanel.querySelectorAll('.mobile-dock-item'));
  if (!items.length) return;

  let isProgrammaticScroll = false;
  let programmaticTimer = null;
  let labelTimer = null;

  // Muestra el nombre/tooltip del ítem temporalmente y luego se oculta
  function flashLabel(item, duration = 1300) {
    clearTimeout(labelTimer);
    items.forEach(i => i.classList.remove('label-visible'));
    if (!item) return;

    item.classList.add('label-visible');
    labelTimer = setTimeout(() => {
      item.classList.remove('label-visible');
    }, duration);
  }

  function hideAllLabels() {
    clearTimeout(labelTimer);
    items.forEach(i => i.classList.remove('label-visible'));
  }

  function moveTo(item, isTemporary = false) {
    if (!item) return;
    const leftOffset = item.offsetLeft;
    const width = item.offsetWidth;

    indicator.style.transform = `translate3d(${leftOffset}px, 0, 0)`;
    indicator.style.width = `${width}px`;
    indicator.style.opacity = '1';

    if (item.classList.contains('dock-cta')) {
      indicator.classList.add('is-cta');
    } else {
      indicator.classList.remove('is-cta');
    }

    if (!isTemporary) {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    }
  }

  const getActiveItem = () => dockPanel.querySelector('.mobile-dock-item.active') || items[0];

  // Sincronizar posición inicial exacta (las etiquetas comienzan ocultas)
  const syncInitialItem = () => {
    const hash = window.location.hash;
    let initialItem = null;
    if (hash) {
      initialItem = items.find(i => i.getAttribute('href') === hash);
    }
    if (!initialItem) {
      initialItem = getActiveItem();
    }
    moveTo(initialItem, false);
    hideAllLabels();
  };

  requestAnimationFrame(() => {
    syncInitialItem();
  });

  // Interactividad con clics y taps en los ítems del dock
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          isProgrammaticScroll = true;
          moveTo(item, false);
          flashLabel(item, 1300);

          const headerOffset = 76;
          const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
          history.pushState(null, null, href);

          clearTimeout(programmaticTimer);
          programmaticTimer = setTimeout(() => {
            isProgrammaticScroll = false;
          }, 850);
        }
      } else {
        moveTo(item, false);
        flashLabel(item, 1300);
      }
    });
  });

  // Hover únicamente en dispositivos con cursor real (evita eventos fantasma en smartphones)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
        moveTo(item, true);
      });
    });

    dockPanel.addEventListener('mouseleave', () => {
      moveTo(getActiveItem(), false);
    });
  }

  // Deslizamiento táctil continuo al arrastrar el dedo
  let isDraggingDock = false;
  dockPanel.addEventListener('touchstart', () => {
    isDraggingDock = false;
  }, { passive: true });

  dockPanel.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      isDraggingDock = true;
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const targetEl = document.elementFromPoint(touchX, touchY);
      const dockItem = targetEl ? targetEl.closest('.mobile-dock-item') : null;
      if (dockItem && dockPanel.contains(dockItem)) {
        moveTo(dockItem, true);
        items.forEach(i => i.classList.remove('label-visible'));
        dockItem.classList.add('label-visible');
      }
    }
  }, { passive: true });

  dockPanel.addEventListener('touchend', () => {
    if (isDraggingDock) {
      isDraggingDock = false;
      const activeItem = getActiveItem();
      moveTo(activeItem, false);
      flashLabel(activeItem, 1300);
    }
  });

  window.addEventListener('resize', () => {
    moveTo(getActiveItem(), false);
  });

  // Desbloqueo tras finalizar scroll
  window.addEventListener('scrollend', () => {
    isProgrammaticScroll = false;
    updateDockOnScroll();
  }, { passive: true });

  // Sincronización del Dock al scrollear libremente la página (Scroll-Spy con requestAnimationFrame)
  let isScrollTicking = false;
  window.addEventListener('scroll', () => {
    if (isProgrammaticScroll) return;
    if (!isScrollTicking) {
      window.requestAnimationFrame(() => {
        updateDockOnScroll();
        isScrollTicking = false;
      });
      isScrollTicking = true;
    }
  }, { passive: true });

  function updateDockOnScroll() {
    if (isProgrammaticScroll) return;
    if (window.location.pathname.includes('deportes')) return;

    const scrollPos = window.scrollY + 180;
    const sociosEl = document.getElementById('socios');
    const fixtureEl = document.getElementById('fixture');
    const deportesEl = document.getElementById('deportes');

    let currentHref = '#hero';
    if (sociosEl && scrollPos >= sociosEl.offsetTop) {
      currentHref = '#socios';
    } else if (fixtureEl && scrollPos >= fixtureEl.offsetTop) {
      currentHref = '#fixture';
    } else if (deportesEl && scrollPos >= deportesEl.offsetTop) {
      currentHref = '#deportes';
    } else {
      currentHref = '#hero';
    }

    const targetItem = items.find(i => {
      const h = i.getAttribute('href');
      if (currentHref === '#hero') {
        return h === '#hero' || h === 'index.html' || h === '/' || h === '#';
      }
      return h === currentHref;
    });

    if (targetItem && !targetItem.classList.contains('active')) {
      moveTo(targetItem, false);
      flashLabel(targetItem, 1300);
    }
  }
}

/**
 * Desplazamiento suave para todos los enlaces ancla y el logo del club (evita saltos bruscos)
 */
function initSmoothScroll() {
  const isHomePage = window.location.pathname.endsWith('index.html') || 
                     window.location.pathname === '/' || 
                     !window.location.pathname.includes('.html');

  // Clic en el logo del club o enlaces de "Inicio": deslizar suavemente hacia el header en la Home
  document.querySelectorAll('.brand-logo-link, a[href="index.html"], a[href="./"], a[href="/"], a[href="#mainHeader"], a[href="#hero"]').forEach(link => {
    if (link.classList.contains('mobile-dock-item')) return;

    link.addEventListener('click', (e) => {
      // Si estamos en la página principal (o el enlace es un ancla interna hacia el header), scroll suave a top: 0
      const isAnchorToHeader = link.getAttribute('href') === '#mainHeader' || link.getAttribute('href') === '#hero';
      if (isHomePage || isAnchorToHeader) {
        e.preventDefault();

        // 1. Feedback rojo interactivo en el logo durante el trayecto
        const logoBrand = link.closest('.brand-logo-link') || link;
        logoBrand.classList.add('logo-clicked-red');

        // Retira el color rojo con desvanecimiento suave al volver al header
        const clearLogoRed = () => {
          logoBrand.classList.remove('logo-clicked-red');
          link.blur();
          if (document.activeElement) {
            document.activeElement.blur();
          }
        };

        // Si ya está en la cabecera (scrollY <= 15), se desvanece tras 350ms
        if (window.scrollY <= 15) {
          setTimeout(clearLogoRed, 350);
        } else {
          // Monitoriza la llegada al header para retirar el rojo apenas llega a destino
          let hasArrived = false;
          const onArrival = () => {
            if (hasArrived) return;
            hasArrived = true;
            window.removeEventListener('scrollend', onScrollEnd);
            cancelAnimationFrame(checkScrollRaf);
            clearTimeout(fallbackTimer);
            clearLogoRed();
          };

          const onScrollEnd = () => {
            if (window.scrollY <= 50) {
              onArrival();
            }
          };
          window.addEventListener('scrollend', onScrollEnd, { once: true });

          let checkScrollRaf = null;
          const checkScroll = () => {
            if (window.scrollY <= 15) {
              onArrival();
            } else {
              checkScrollRaf = requestAnimationFrame(checkScroll);
            }
          };
          checkScrollRaf = requestAnimationFrame(checkScroll);

          const fallbackTimer = setTimeout(onArrival, 800);
        }

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        if (isHomePage) {
          history.pushState(null, null, window.location.pathname);
        }

        // Si el drawer móvil estaba abierto, cerrarlo
        const drawerBackdrop = document.getElementById('drawerBackdrop');
        if (drawerBackdrop && !drawerBackdrop.classList.contains('pointer-events-none')) {
          const closeBtn = document.getElementById('closeMobileMenuBtn');
          if (closeBtn) closeBtn.click();
        }

        // Sincronizar dock bar para marcar 'Inicio'
        const dockPanel = document.querySelector('.mobile-dock-panel');
        if (dockPanel) {
          const heroItem = dockPanel.querySelector('.mobile-dock-item[href="#hero"], .mobile-dock-item[href="index.html"]');
          if (heroItem) {
            const indicator = dockPanel.querySelector('.mobile-dock-indicator');
            if (indicator) {
              indicator.style.transform = `translate3d(${heroItem.offsetLeft}px, 0, 0)`;
              indicator.style.width = `${heroItem.offsetWidth}px`;
              indicator.classList.remove('is-cta');
            }
            dockPanel.querySelectorAll('.mobile-dock-item').forEach(i => {
              i.classList.remove('active');
              i.classList.remove('label-visible');
            });
            heroItem.classList.add('active');
          }
        }
      }
    });
  });

  // Enlaces ancla estándar (#)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.classList.contains('mobile-dock-item') || anchor.classList.contains('brand-logo-link')) return;

    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#') return;
      if (hash === '#mainHeader' || hash === '#hero' || hash === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        history.pushState(null, null, hash);
        return;
      }
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const headerOffset = 76;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
        history.pushState(null, null, hash);
      }
    });
  });

  // Soporte para apertura suave si viene con un hash en la URL
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        const headerOffset = 76;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }, 120);
    }
  }
}



/**
 * Sticky Header elevation on scroll
 */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-xl', 'bg-emerald-950/95');
      header.classList.remove('bg-emerald-950/85');
    } else {
      header.classList.remove('shadow-xl', 'bg-emerald-950/95');
      header.classList.add('bg-emerald-950/85');
    }
  }, { passive: true });
}

/**
 * Sports Tabs (Rugby / Hockey) switcher & Division render
 */
function initSportsTabs() {
  const rugbyTabBtn = document.getElementById('tabRugbyBtn');
  const hockeyTabBtn = document.getElementById('tabHockeyBtn');
  const rugbyContent = document.getElementById('rugbyContent');
  const hockeyContent = document.getElementById('hockeyContent');

  if (!rugbyTabBtn || !hockeyTabBtn) return;

  const activateRugby = () => {
    rugbyTabBtn.classList.add('bg-emerald-800', 'text-white', 'shadow-md');
    rugbyTabBtn.classList.remove('bg-transparent', 'text-gray-300', 'hover:text-white');
    hockeyTabBtn.classList.remove('bg-emerald-800', 'text-white', 'shadow-md');
    hockeyTabBtn.classList.add('bg-transparent', 'text-gray-300', 'hover:text-white');

    if (rugbyContent) rugbyContent.classList.remove('hidden');
    if (hockeyContent) hockeyContent.classList.add('hidden');
  };

  const activateHockey = () => {
    hockeyTabBtn.classList.add('bg-emerald-800', 'text-white', 'shadow-md');
    hockeyTabBtn.classList.remove('bg-transparent', 'text-gray-300', 'hover:text-white');
    rugbyTabBtn.classList.remove('bg-emerald-800', 'text-white', 'shadow-md');
    rugbyTabBtn.classList.add('bg-transparent', 'text-gray-300', 'hover:text-white');

    if (hockeyContent) hockeyContent.classList.remove('hidden');
    if (rugbyContent) rugbyContent.classList.add('hidden');
  };

  rugbyTabBtn.addEventListener('click', activateRugby);
  hockeyTabBtn.addEventListener('click', activateHockey);
}

/**
 * Interactive Pre-Registration and Cuota Modal
 */
function initRegistrationModal() {
  const modal = document.getElementById('registerModal');
  const openBtns = document.querySelectorAll('.open-register-modal');
  const closeBtns = document.querySelectorAll('.close-register-modal');
  const regForm = document.getElementById('registerForm');

  const mobileDock = document.getElementById('mobileDock');

  if (!modal) return;

  const openModal = (sportDefault = 'rugby') => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (mobileDock) {
      mobileDock.classList.add('dock-hidden');
    }
    document.body.style.overflow = 'hidden';

    const sportSelect = document.getElementById('regSport');
    if (sportSelect && (sportDefault === 'rugby' || sportDefault === 'hockey')) {
      sportSelect.value = sportDefault;
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    if (mobileDock) {
      mobileDock.classList.remove('dock-hidden');
    }
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const sport = btn.getAttribute('data-sport') || 'rugby';
      openModal(sport);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const phone = document.getElementById('regPhone').value;
      const sport = document.getElementById('regSport').value;
      const division = document.getElementById('regDivision').value;

      // Construct WhatsApp message
      const text = encodeURIComponent(
        `¡Hola Delta Rugby Club! Quiero asociarme / preinscribirme.\nNombre: ${name}\nTeléfono: ${phone}\nDeporte: ${sport}\nCategoría: ${division}`
      );
      const whatsappUrl = `https://wa.me/5491140503320?text=${text}`;

      // Show success feedback
      const formContainer = document.getElementById('modalFormContainer');
      const successContainer = document.getElementById('modalSuccessContainer');
      if (formContainer && successContainer) {
        formContainer.classList.add('hidden');
        successContainer.classList.remove('hidden');
      }

      // Open WhatsApp in new tab after brief delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 900);
    });
  }
}

/**
 * Membership Fee Calculator
 */
function initMembershipCalculator() {
  const sportSelect = document.getElementById('calcSport');
  const categorySelect = document.getElementById('calcCategory');
  const familyCount = document.getElementById('calcFamilyCount');
  const priceDisplay = document.getElementById('calcPriceResult');

  if (!sportSelect || !categorySelect || !priceDisplay) return;

  const basePrices = {
    superior: 28500,
    juveniles: 24000,
    infantiles: 19500,
    familiar: 14000
  };

  function calculate() {
    const cat = categorySelect.value;
    const count = parseInt(familyCount ? familyCount.value : '1', 10) || 1;
    let base = basePrices[cat] || 24000;

    let total = base;
    if (count === 2) {
      total = base + (base * 0.8); // 20% discount on 2nd child
    } else if (count >= 3) {
      total = base + (base * 0.8) + (base * 0.5 * (count - 2)); // 50% discount on 3rd+
    }

    priceDisplay.textContent = `$${Math.round(total).toLocaleString('es-AR')}`;
  }

  sportSelect.addEventListener('change', calculate);
  categorySelect.addEventListener('change', calculate);
  if (familyCount) familyCount.addEventListener('input', calculate);

  calculate();
}

/**
 * Toast feedback helper
 */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-950 text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500/30 flex items-center gap-3 transition-all duration-300 opacity-0 pointer-events-none text-sm font-medium';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <span>${message}</span>
  `;

  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
  toast.classList.add('opacity-100', 'translate-y-0');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3500);
}

// Make showToast available globally
window.showToast = showToast;

/**
 * Mobile Hero Video Autoplay Safeguard
 */
function initMobileHeroVideo() {
  const video = document.getElementById('heroMobileVideo');
  if (!video) return;

  video.muted = true;
  video.setAttribute('playsinline', '');

  const startPlayback = () => {
    if (window.innerWidth < 1024) {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Autoplay policy prevented playback, poster frame remains visible
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  };

  startPlayback();

  window.addEventListener('resize', () => {
    if (window.innerWidth < 1024) {
      if (video.paused) startPlayback();
    } else {
      if (!video.paused) video.pause();
    }
  }, { passive: true });
}

/**
 * Tab switcher for Section 6 (El Club: Historia, Comisión, CAPS, Servicios, Llegar)
 */
window.switchClubTab = function(tabId) {
  const tabs = ['historia', 'comision', 'caps', 'servicios', 'llegar'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tabBtn-${t}`);
    const panel = document.getElementById(`tabContent-${t}`);
    if (btn) {
      if (t === tabId) {
        btn.classList.add('bg-[#C29B38]', 'text-[#072119]');
        btn.classList.remove('bg-white/10', 'text-gray-200');
      } else {
        btn.classList.remove('bg-[#C29B38]', 'text-[#072119]');
        btn.classList.add('bg-white/10', 'text-gray-200');
      }
    }
    if (panel) {
      if (t === tabId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    }
  });
};


