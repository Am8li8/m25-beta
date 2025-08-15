document.addEventListener('DOMContentLoaded', function () {
  // =========== كود السلايدر هنا ===========

document.querySelectorAll('.project-card').forEach(card => {
  const track = card.querySelector('.slider-track');
  const prevBtn = card.querySelector('.slider-prev');
  const nextBtn = card.querySelector('.slider-next');
  
  // جمع كل الصور والفيديوهات مع بعض
  const slides = track.querySelectorAll('img, video');
  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  // التحكم بالأزرار
  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlider();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // التحكم بالسحب باللمس
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      nextBtn.click();
    } else if (startX < endX - 50) {
      prevBtn.click();
    }
  });

  // التحكم بالسحب بالماوس
  let isDown = false;

  track.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.clientX;
  });

  track.addEventListener('mouseup', e => {
    if (!isDown) return;
    isDown = false;
    endX = e.clientX;
    if (startX > endX + 50) {
      nextBtn.click();
    } else if (startX < endX - 50) {
      prevBtn.click();
    }
  });

  // منع سحب الصور والفيديوهات نفسها
  slides.forEach(media => {
    media.addEventListener('dragstart', e => e.preventDefault());
  });
});


  // =========== كود تفعيل الرابط الحالي في الـ nav ===========

  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    const linkPage = href.split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});

const goUpBtn = document.querySelector('.goup');

  if (goUpBtn) {
    goUpBtn.classList.remove('show');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 160) {
        goUpBtn.classList.add('show');
      } else {
        goUpBtn.classList.remove('show');
      }
    });

    goUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  function toggleBox(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');

    if (content.style.maxHeight) {
      // إغلاق
      content.style.maxHeight = null;
      content.style.opacity = 0;
      icon.textContent = '+';
    } else {
      // فتح
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.opacity = 1;
      icon.textContent = '−';
    }
  }

// === صفحة تسجيل الدخول ===
const sendButton = document.getElementById("sendCode");
if (sendButton) {
  sendButton.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message");

    if (!email) {
      message.textContent = "من فضلك أدخل الإيميل";
      message.className = "message error";
      return;
    }

    // توليد كود عشوائي
    const code = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("loginCode", code);
    localStorage.setItem("loginEmail", email);

    message.textContent = "تم إرسال الكود إلى الإيميل";
    message.className = "message success";

    setTimeout(() => {
      window.location.href = "verify.html";
    }, 1500);
  });
}

// === صفحة التحقق ===
const verifyButton = document.getElementById("verifyCode");
if (verifyButton) {
  const correctCode = localStorage.getItem("loginCode");
  const email = localStorage.getItem("loginEmail");
  const message = document.getElementById("message");
  const codeInputs = document.querySelectorAll(".code-box");

  if (!correctCode || !email) {
    message.textContent = "من فضلك أدخل الإيميل أولاً";
    message.className = "message error";
  }

  // التنقل بين الخانات
  codeInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && index > 0 && !input.value) {
        codeInputs[index - 1].focus();
      }
    });
  });

  // التحقق عند الضغط
  verifyButton.addEventListener("click", () => {
    const enteredCode = Array.from(codeInputs).map(input => input.value).join("");

    if (enteredCode === correctCode) {
      message.textContent = "تم تسجيل الدخول بنجاح";
      message.className = "message success";
      localStorage.removeItem("loginCode");
      localStorage.removeItem("loginEmail");
    } else {
      message.textContent = "الكود غير صحيح";
      message.className = "message error";
    }
  });
}

  window.addEventListener('load', () => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('content').style.display = 'block';
  });

  const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const body = document.body;

// تحميل الوضع المحفوظ
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  moonIcon.style.display = "none";
  sunIcon.style.display = "block";
}

// عند الضغط على زر التبديل
document.querySelector(".theme-toggle").addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    moonIcon.style.display = "none";
    sunIcon.style.display = "block";
    localStorage.setItem("theme", "dark");
  } else {
    moonIcon.style.display = "block";
    sunIcon.style.display = "none";
    localStorage.setItem("theme", "light");
  }
});

document.getElementById("burger").addEventListener("click", function () {
  document.getElementById("navMenu").classList.toggle("show");
});
