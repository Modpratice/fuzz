/**
 * FUZZYBEAR NFTs on XRPL - Main JavaScript
 * Vanilla JavaScript implementation for interactivity, timers, canvas banner generator, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initColorFlashingButtons();
  initMarketplaceDropdown();
  initCountdownTimers();
  initTimelineAccordion();
  initBannerGenerator();
  initMobileNavigation();
  initNewsletterForm();
  initAddressModal();
});

/* ===================================================================
   1. COLOR FLASHING BUTTONS
   =================================================================== */
function initColorFlashingButtons() {
  const rainbowColors = [
    "#19ff83",
    "#1aa4ff",
    "#791aff",
    "#d91aff",
    "#ff1a8b",
    "#ff671a",
    "#faff1a",
    "#d4d7dd"
  ];

  const warmColors = ["#FF1A8B", "#FF671A", "#FAFF1A"];

  // Flashing Reverse Button (if present)
  const reverseBtns = document.querySelectorAll('.btn-flashing-reverse');
  if (reverseBtns.length > 0) {
    let reverseIndex = 0;
    setInterval(() => {
      reverseBtns.forEach(btn => {
        btn.style.backgroundColor = rainbowColors[reverseIndex];
      });
      reverseIndex = (reverseIndex + 1) % rainbowColors.length;
    }, 1000);
  }

  // Buy on XRP Cafe / Buy on Bidds buttons
  const actionBtns = document.querySelectorAll('.btn-action-flashing');
  let actionIndex = 0;
  setInterval(() => {
    actionBtns.forEach((btn, i) => {
      const idx = (actionIndex + i * 2) % rainbowColors.length;
      btn.style.backgroundColor = rainbowColors[idx];
    });
    actionIndex = (actionIndex + 1) % rainbowColors.length;
  }, 1200);

  // View on XRP Cafe Button
  const viewBtns = document.querySelectorAll('.btn-view-xrpcafe');
  let viewIndex = 0;
  setInterval(() => {
    viewBtns.forEach(btn => {
      btn.style.backgroundColor = warmColors[viewIndex];
    });
    viewIndex = (viewIndex + 1) % warmColors.length;
  }, 1000);
}

/* ===================================================================
   2. MARKETPLACE DROPDOWN
   =================================================================== */
function initMarketplaceDropdown() {
  const dropdownWrappers = document.querySelectorAll('.marketplace-dropdown-wrapper');
  
  dropdownWrappers.forEach(wrapper => {
    const btn = wrapper.querySelector('.fuzzy-explorer-btn');
    const list = wrapper.querySelector('.fuzzy-explorer-list');
    const icon = wrapper.querySelector('.fuzzy-explorer-icon');

    if (!btn || !list) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = list.classList.contains('show');
      
      // Close all first
      document.querySelectorAll('.fuzzy-explorer-list').forEach(l => l.classList.remove('show'));
      document.querySelectorAll('.fuzzy-explorer-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.fuzzy-explorer-icon').forEach(ic => ic.classList.remove('rotate'));

      if (!isOpen) {
        list.classList.add('show');
        btn.classList.add('active');
        if (icon) icon.classList.add('rotate');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.marketplace-dropdown-wrapper')) {
      document.querySelectorAll('.fuzzy-explorer-list').forEach(l => l.classList.remove('show'));
      document.querySelectorAll('.fuzzy-explorer-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.fuzzy-explorer-icon').forEach(ic => ic.classList.remove('rotate'));
    }
  });
}

/* ===================================================================
   3. COUNTDOWN TIMERS
   =================================================================== */
function initCountdownTimers() {
  const rainbowColors = [
    "#19ff83", "#1aa4ff", "#791aff", "#d91aff",
    "#ff1a8b", "#ff671a", "#faff1a", "#d4d7dd"
  ];

  // Target time: October 1, 2026 at 10:00 AM EDT
  let targetTime = new Date("2026-10-01T10:00:00-04:00").getTime();
  if (isNaN(targetTime) || targetTime <= Date.now()) {
    // If date has passed, simulate future event
    targetTime = Date.now() + 1000 * 60 * 60 * 24 * 42; // 42 days in future
  }

  const daysEls = document.querySelectorAll('.countdown-days');
  const hoursEls = document.querySelectorAll('.countdown-hours');
  const minutesEls = document.querySelectorAll('.countdown-minutes');
  const secondsEls = document.querySelectorAll('.countdown-seconds');
  const allNumberEls = document.querySelectorAll('.countdown-number');

  let colorIdx = 0;

  function tick() {
    const now = Date.now();
    let diff = targetTime - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEls.forEach(el => el.textContent = days);
    hoursEls.forEach(el => el.textContent = String(hours).padStart(2, '0'));
    minutesEls.forEach(el => el.textContent = String(minutes).padStart(2, '0'));
    secondsEls.forEach(el => el.textContent = String(seconds).padStart(2, '0'));

    // Cycle number colors
    const currentColor = rainbowColors[colorIdx];
    allNumberEls.forEach(el => el.style.color = currentColor);
    colorIdx = (colorIdx + 1) % rainbowColors.length;
  }

  tick();
  setInterval(tick, 1000);
}

/* ===================================================================
   4. TIMELINE ACCORDION
   =================================================================== */
function initTimelineAccordion() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach(item => {
    const header = item.querySelector('.timeline-item-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      // Toggle current
      item.classList.toggle('active', !wasActive);
    });
  });
}

/* ===================================================================
   5. BANNER GENERATOR
   =================================================================== */
function initBannerGenerator() {
  const canvas = document.getElementById('bannerCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const nftInput = document.getElementById('nftNumberInput');
  const line1Input = document.getElementById('displayName1Input');
  const line2Input = document.getElementById('displayName2Input');
  const line1Minus = document.getElementById('line1MinusBtn');
  const line1Plus = document.getElementById('line1PlusBtn');
  const line2Minus = document.getElementById('line2MinusBtn');
  const line2Plus = document.getElementById('line2PlusBtn');
  const downloadBtn = document.getElementById('downloadBannerBtn');
  const errorMsg = document.getElementById('bannerErrorMsg');
  const bgPills = document.querySelectorAll('.bg-choice-pill');

  let line1Size = 170;
  let line2Size = 170;
  const minSize = 105;
  const maxSize = 245;

  let currentNFTNum = 321;
  let currentBgName = "XRPL Blue-Purple";
  let nftImage = new Image();
  let bgImage = new Image();
  let overlayImage = null;

  const bgAssets = {
    "XRPL Green": "images/bg-xrpl-green.png",
    "XRPL Blue": "images/bg-xrpl-blue.png",
    "XRPL Blue-Purple": "images/bg-xrpl-blue-purple.png",
    "XRPL Red-Purple": "images/bg-xrpl-red-purple.png",
    "XRPL Orange": "images/bg-xrpl-orange.png",
    "XRPL Yellow": "images/bg-xrpl-yellow.png",
    "XRPL Magenta": "images/bg-xrpl-magenta.png",
    "XRPL Gray": "images/bg-xrpl-gray.png",
    "XRPattern": "images/bg-xrpattern.png",
    "Triskellion": "images/bg-triskellion.png"
  };

  // Pre-load default background
  bgImage.crossOrigin = "anonymous";
  bgImage.src = bgAssets[currentBgName] || "images/bg-xrpl-blue-purple.png";
  bgImage.onload = () => drawBanner();

  // Load default NFT image
  nftImage.crossOrigin = "anonymous";
  nftImage.src = "images/fuzzybear-nft.gif";
  nftImage.onload = () => drawBanner();

  // Helper text truncator
  function truncateText(text, maxWidth, font) {
    ctx.font = font;
    if (ctx.measureText(text).width <= maxWidth) return text;
    while (text.length > 0 && ctx.measureText(text + "...").width > maxWidth) {
      text = text.substring(0, text.length - 1);
    }
    return text + "...";
  }

  function drawBanner() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw background
    if (bgImage && bgImage.complete && bgImage.naturalWidth > 0) {
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    } else {
      // Fallback gradient if image not ready
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#5e2c07');
      grad.addColorStop(1, '#231612');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 2. Draw overlay if present
    if (overlayImage && overlayImage.complete && overlayImage.naturalWidth > 0) {
      ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
    }

    // 3. Draw NFT illustration on right side
    if (nftImage && nftImage.complete && nftImage.naturalWidth > 0) {
      const imgAspect = nftImage.naturalWidth / nftImage.naturalHeight;
      const imgH = canvas.height;
      const imgW = imgAspect * imgH;
      const imgX = canvas.width - imgW;
      ctx.drawImage(nftImage, imgX, 0, imgW, imgH);
    }

    // 4. Determine text color based on background
    let textColor = "#000000";
    if (
      currentBgName === "XRPL Blue-Purple" || 
      currentBgName === "Triskellion" || 
      currentBgName === "XRPattern" ||
      currentBgName === "XRPL Red-Purple" ||
      currentBgName === "XRPL Blue"
    ) {
      textColor = "#ffffff";
    }

    // 5. Draw typography text
    ctx.textAlign = "center";
    ctx.fillStyle = textColor;

    const maxWidth = 1013;
    const isMobileView = window.innerWidth < 768;

    const subtitleFont = (isMobileView ? "400 " : "bold ") + (isMobileView ? "90px" : "80px") + " 'Teko', sans-serif";
    const topTitleFont = (isMobileView ? "500 " : "bold ") + line1Size + "px 'Bakbak One', sans-serif";
    const bottomTitleFont = (isMobileView ? "500 " : "bold ") + line2Size + "px 'Bakbak One', sans-serif";

    let subtitleText = currentNFTNum ? `FUZZYBEAR #${currentNFTNum}` : "FUZZYBEAR #";
    subtitleText = subtitleText.toUpperCase();

    let topText = (line1Input ? line1Input.value : "").trim().toUpperCase();
    if (!topText) topText = "YOUR NAME HERE";

    let bottomText = (line2Input ? line2Input.value : "").trim().toUpperCase();

    subtitleText = truncateText(subtitleText, maxWidth, subtitleFont);
    topText = truncateText(topText, maxWidth, topTitleFont);
    if (bottomText) bottomText = truncateText(bottomText, maxWidth, bottomTitleFont);

    const lines = [
      { text: subtitleText, font: subtitleFont, height: isMobileView ? 90 : 80 },
      { text: topText, font: topTitleFont, height: line1Size }
    ];

    if (bottomText) {
      lines.push({ text: bottomText, font: bottomTitleFont, height: line2Size });
    }

    const totalHeight = lines.reduce((sum, line) => sum + line.height, 0);
    const verticalOffset = 20;
    let currentY = (canvas.height - totalHeight) / 2 - verticalOffset;

    lines.forEach(line => {
      ctx.font = line.font;
      currentY += line.height;
      ctx.fillText(line.text, canvas.width / 2, currentY);
    });
  }

  // Event Listeners for inputs
  if (line1Input) line1Input.addEventListener('input', drawBanner);
  if (line2Input) line2Input.addEventListener('input', drawBanner);

  // Line 1 Size +/-
  if (line1Minus) line1Minus.addEventListener('click', () => {
    if (line1Size > minSize) { line1Size -= 10; drawBanner(); }
  });
  if (line1Plus) line1Plus.addEventListener('click', () => {
    if (line1Size < maxSize) { line1Size += 10; drawBanner(); }
  });

  // Line 2 Size +/-
  if (line2Minus) line2Minus.addEventListener('click', () => {
    if (line2Size > minSize) { line2Size -= 10; drawBanner(); }
  });
  if (line2Plus) line2Plus.addEventListener('click', () => {
    if (line2Size < maxSize) { line2Size += 10; drawBanner(); }
  });

  // Background pills
  bgPills.forEach(pill => {
    pill.addEventListener('click', () => {
      bgPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const bgName = pill.getAttribute('data-bg');
      currentBgName = bgName;
      if (bgAssets[bgName]) {
        bgImage = new Image();
        bgImage.crossOrigin = "anonymous";
        bgImage.src = bgAssets[bgName];
        bgImage.onload = () => drawBanner();
      }
    });
  });

  // NFT Number Input handling & IPFS metadata
  if (nftInput) {
    nftInput.addEventListener('input', async () => {
      const raw = nftInput.value.trim();
      if (!raw) return;
      const numStr = raw.replace(/fuzzybear/ig, "").replace(/#/g, "").trim();
      const num = parseInt(numStr, 10);
      if (isNaN(num)) {
        if (errorMsg) errorMsg.textContent = "PLEASE ENTER A VALID NFT NUMBER.";
        return;
      }
      if (errorMsg) errorMsg.textContent = "";
      currentNFTNum = num;

      // Try loading custom IPFS token or fallback to local GIF
      const remoteImg = new Image();
      remoteImg.crossOrigin = "anonymous";
      remoteImg.onload = () => {
        nftImage = remoteImg;
        drawBanner();
      };
      remoteImg.onerror = () => {
        // Fallback to local default image
        nftImage.src = "images/fuzzybear-nft.gif";
        drawBanner();
      };
      remoteImg.src = `https://ipfs.io/ipfs/bafybeid5gaqiyien2ao2nzlta5p4fdxptty5t7hpbsma4joxzv4s5hvmii/fuzzybear-%23${num}.png`;

      drawBanner();
    });
  }

  // Download Banner as PNG
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      drawBanner();
      canvas.toBlob(blob => {
        if (!blob) return;
        const link = document.createElement('a');
        link.download = `FuzzybearBanner_${currentNFTNum || 'custom'}.png`;
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Banner image downloaded!");
      }, 'image/png');
    });
  }

  // Ensure initial render once fonts load
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(drawBanner);
  } else {
    setTimeout(drawBanner, 500);
  }
}

/* ===================================================================
   6. MOBILE NAVIGATION DRAWER
   =================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggleBtn || !overlay) return;

  const openDrawer = () => {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDrawer();
  });

  // Close when clicking nav link
  overlay.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ===================================================================
   7. NEWSLETTER FORM
   =================================================================== */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const feedback = form.querySelector('.newsletter-feedback');
      const email = input ? input.value.trim() : '';

      if (email && email.includes('@')) {
        if (feedback) {
          feedback.textContent = "Thank you! Check your inbox for updates.";
          feedback.classList.add('success');
        }
        if (input) input.value = '';
        showToast("Subscribed! Check your inbox for Fuzzybear updates.");
      } else {
        alert("Please enter a valid email address.");
      }
    });
  });
}

/* ===================================================================
   8. XRPL ADDRESS COPY MODAL
   =================================================================== */
function initAddressModal() {
  const modal = document.querySelector('.address-modal-overlay');
  const closeBtn = document.querySelector('.address-modal-close');
  const copyBtns = document.querySelectorAll('.btn-copy-address, .address-code-box');

  const openTriggers = document.querySelectorAll('.open-address-modal');
  openTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.classList.add('show');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('show');
    });
  }

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const addressText = "rhCAT4hRdi2Y9puNdkpMzxrdKa5wkppR62";
      navigator.clipboard.writeText(addressText).then(() => {
        showToast("XRPL Address copied to clipboard!");
      }).catch(() => {
        showToast("Address copied!");
      });
    });
  });
}

/* ===================================================================
   TOAST NOTIFICATION
   =================================================================== */
function showToast(message) {
  let toast = document.querySelector('.toast-alert');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
