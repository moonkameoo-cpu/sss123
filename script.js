window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const content = document.getElementById('main-content');

    // ให้แสดง Loader ไว้ครู่หนึ่งเพื่อให้เห็น Animation (เช่น 2 วินาที) หรือเอาออกเพื่อให้หายทันทีที่โหลดเสร็จ
    setTimeout(function() {
        // ซ่อน Loader โดยการเปลี่ยน Opacity (ใช้ Transition จาก CSS ที่คุณเขียนไว้)
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        // แสดงเนื้อหาหลัก
        content.style.opacity = "1";
    }, 2000); 
});

const fill = document.querySelector('.fill');
const loaderText = document.querySelector('.loader-text');

let progress = 0;

const interval = setInterval(() => {
    progress += 1; // เพิ่มทีละ 1%
    fill.style.width = progress + '%';

    // ตรรกะการเปลี่ยนข้อความตามเปอร์เซ็นต์
    if (progress < 30) {
        loaderText.innerText = "INITIALIZING...";
    } else if (progress < 80) {
        loaderText.innerText = "LOADING CORE...";
    } else if (progress < 100) {
        loaderText.innerText = "SYSTEM ONLINE";
    } else {
        clearInterval(interval);
        loaderText.innerText = "ACCESS GRANTED"; // ข้อความหลังโหลดเสร็จ (เลือกปรับได้)
        loaderText.classList.add('finished'); 
    }
}, 10); // 50ms คือความเร็วในการเพิ่ม % (ปรับให้น้อยลงถ้าอยากให้โหลดไวขึ้น)


window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
const elements = document.querySelectorAll('.fade-in');
elements.forEach(el => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) el.classList.add('show');
    });
  });
  observer.observe(el);
});

const galaxy = document.getElementById('galaxy');
const numStars = 200; // จำนวนดาว
const stars = [];

// สร้างดาว
for(let i=0; i<numStars; i++){
  const star = document.createElement('div');
  star.classList.add('star');
  
  const size = Math.random() * 2 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  
  star.dataset.x = Math.random() * window.innerWidth;
  star.dataset.y = Math.random() * window.innerHeight;
  star.dataset.z = Math.random() * 1000; // ระยะลึก 3D

  star.style.left = star.dataset.x + 'px';
  star.style.top = star.dataset.y + 'px';
  
  galaxy.appendChild(star);
  stars.push(star);
}

// Animate 3D Floating
function animateStars() {
  stars.forEach(star => {
    let z = star.dataset.z;
    z -= 2; // ความเร็วดาวเคลื่อนที่
    if(z < 0) z = 1000; // reset ถ้าไปถึงหน้าจอ
    star.dataset.z = z;
    
    const scale = 1 - z / 1000;
    star.style.transform = `translate3d(0,0,0) scale(${scale})`;
    star.style.opacity = scale;
  });
  
  requestAnimationFrame(animateStars);
}
animateStars();



window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const fill = document.querySelector('.fill');
    const content = document.getElementById('main-content');

    const warpSound = new Audio('warp.mp3');
    warpSound.volume = 0.5;

    let start = null;
    const duration = 2200; // ระยะเวลาหลอดโหลด (ms)

    function easeInOut(t) {
        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function animate(time) {
        if (!start) start = time;
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOut(progress);

        fill.style.transform = `scaleX(${eased})`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // จังหวะวาร์ป
            warpSound.play();

            loader.style.opacity = '0';
            loader.style.transition = 'opacity .6s ease';

            setTimeout(() => {
                loader.style.display = 'none';
                content.style.display = 'block';
                content.classList.add('show');
            }, 600);
        }
    }

    requestAnimationFrame(animate);
});


const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(keyword) ? "block" : "none";
  });
});



function goPage() {
  window.location.href = "members.html";
}



function noFacebookConfirm() {
  return confirm("ไม่เล่นเฟสนะครับ\nต้องการเปิดโปรไฟล์ต่อหรือไม่?");
}

setInterval(() => {
    if (window.outerWidth - window.innerWidth > 160 ||
        window.outerHeight - window.innerHeight > 160) {
        document.body.innerHTML = "<h1>Access Denied</h1>";
    }
}, 1000);


const textElement = document.getElementById('typing-text');
const text = "KING WEAPON BET OC / / MEMBERS STEPFIAW 2026";

let i = 0;
let isDeleting = false;
const speed = 100; // ความเร็วพิมพ์
const deleteSpeed = 50; // ความเร็วลบ
const delay = 1500; // หยุดก่อนลบ

function typeLoop() {
    if (!isDeleting) {
        textElement.textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) {
            // พิมพ์เต็มแล้ว รอแล้วเริ่มลบ
            setTimeout(() => {
                isDeleting = true;
                typeLoop();
            }, delay);
            return;
        }
        setTimeout(typeLoop, speed);
    } else {
        textElement.textContent = text.substring(0, i - 1);
        i--;
        if (i === 0) {
            // ลบหมดแล้ว กลับไปพิมพ์ใหม่
            isDeleting = false;
        }
        setTimeout(typeLoop, deleteSpeed);
    }
}

typeLoop();
