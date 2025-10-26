// عناصر التحكم الأساسية
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const menu = document.getElementById('menu');


// عناصر المنيو الفرعية
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const submenu = document.getElementById('submenu');

// حماية: تأكد أن العناصر موجودة
if (openBtn && closeBtn && menu) {
  openBtn.addEventListener('click', () => {
    menu.classList.add('show');
    openBtn.style.display = 'none';
    closeBtn.style.display = 'inline-block';
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('show');
    closeBtn.style.display = 'none';
    openBtn.style.display = 'inline-block';
  });
} else {
  console.warn('open/close/menu غير موجود/ة');
}

// عندما يضغط المستخدم على "المنيو" لفتح/إغلاق الفرعي
if (menuToggle && menuIcon && submenu) {
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); // منع الفقاعه لكي لا يصل للنقر العام

    const isOpen = submenu.classList.contains('open');

    if (isOpen) {
      // اغلاق
      submenu.classList.remove('open');
      // افتراضي: نعيد maxHeight الى null لتسمح بالقياس اللاحق (مفيد عند إعادة الفتح)
      submenu.style.maxHeight = null;
      menuIcon.textContent = '+';
      menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      // فتح: اضبط maxHeight الى scrollHeight للحصول على انزلاق سلس
      submenu.classList.add('open');
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
      menuIcon.textContent = '−';
      menuToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // عند الضغط في أي مكان خارجي نغلق الفرعي (مفيد للكمبيوتر)
  document.addEventListener('click', (e) => {
    const container = menuToggle.closest('.has-submenu');
    if (!container) return;
    if (!container.contains(e.target) && submenu.classList.contains('open')) {
      submenu.classList.remove('open');
      submenu.style.maxHeight = null;
      menuIcon.textContent = '+';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // عند تغيير حجم النافذة، نعيد ضبط maxHeight إذا كان مفتوحاً (لمنع مشاكل القياس)
  window.addEventListener('resize', () => {
    if (submenu.classList.contains('open')) {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
    } else {
      submenu.style.maxHeight = null;
    }
  });
} else {
  console.warn('menuToggle/menuIcon/submenu غير موجود/ة');
}


// ✅ زر الواتساب
const whatsappBtn = document.querySelector('.whatsapp-btn');

// ✅ إخفاؤه مبدئيًا
whatsappBtn.style.display = 'none';

// ✅ عند التمرير (scroll)
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY; // كم نزل المستخدم من الأعلى
  const triggerPoint = 2000; // غيّر الرقم حسب المكان الذي تريده (بالبكسل)

  if (scrollY > triggerPoint) {
    // أظهر الزر مع تأثير سلس
    whatsappBtn.style.display = 'flex';
    whatsappBtn.style.opacity = '1';
    whatsappBtn.style.transform = 'translateY(0)';
  } else {
    // أخفِ الزر إذا عاد المستخدم للأعلى
    whatsappBtn.style.opacity = '0';
    whatsappBtn.style.transform = 'translateY(50px)';
    setTimeout(() => {
      if (window.scrollY < triggerPoint) whatsappBtn.style.display = 'none';
    }, 300);
  }
});

// تفعيل حالة active عند الضغط على عنصر في القائمة

// window.addEventListener("DOMContentLoaded", () => {
//   const firstMenuItem = document.querySelector("#menu li:first-child");
//   firstMenuItem.classList.add("active");
// });

const menuLinks = document.querySelectorAll("#menu li");
menuLinks.forEach(li => {
  li.addEventListener("click", () => {
    
    menuLinks.forEach(link => link.classList.remove("active"));

 
    li.classList.add("active");
  });
});





// const allMenuItems = document.querySelectorAll("#menu li, #menu .submenu li");

// allMenuItems.forEach(li => {
//   li.addEventListener("click", (e) => {
    
//     allMenuItems.forEach(link => link.classList.remove("active"));

   
//     li.classList.add("active");

    
//     e.stopPropagation();
//   });
// });
