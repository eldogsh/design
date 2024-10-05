//start sting op[tion]
// Toggle settings box
document.querySelector(".toggle .icon").onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector('.setingbox').classList.toggle("open");
};

// Change color for page and save to localStorage
document.querySelectorAll('.colorlist li').forEach(li => {
    li.addEventListener("click", e => {
        let color = e.target.dataset.color;
        document.documentElement.style.setProperty('--mincolor', color);
        document.documentElement.style.setProperty('--hcolor', color);
        document.documentElement.style.setProperty('--rcolor', color);
        document.documentElement.style.setProperty('--gcolor', color);
        document.documentElement.style.setProperty('--ycolor', color);
        localStorage.setItem("color-opt", color);
        handleActive(e);
    });
});

// Load color from localStorage
const mainColor = localStorage.getItem("color-opt");
if (mainColor) {
    document.documentElement.style.setProperty('--mincolor', mainColor);
    document.documentElement.style.setProperty('--hcolor', mainColor);
    document.documentElement.style.setProperty('--rcolor', mainColor);
    document.documentElement.style.setProperty('--gcolor', mainColor);
    document.documentElement.style.setProperty('--ycolor', mainColor);
    document.querySelectorAll(".colorlist li").forEach(li => {
        li.classList.toggle('active', li.dataset.color === mainColor);
    });
}

// Random background option
const imgArray = ["2.jpeg", "3.jpeg", "6.jpeg", "1.jpeg", "2.jpeg"];
let backOption = true, interval;
document.querySelectorAll('.rondam span').forEach(span => {
    span.addEventListener('click', e => {
        handleActive(e);
        backOption = e.target.dataset.background === 'yes';
        localStorage.setItem("background-opt", backOption);
        if (backOption) randomizeBackground();
        else clearInterval(interval);
    });
});

// Change landing page background randomly
const landingPage = document.querySelector(".landing-page");
function randomizeBackground() {
    if (backOption) {
        interval = setInterval(() => {
            let randIndex = Math.floor(Math.random() * imgArray.length);
            landingPage.style.backgroundImage = `url("./img/${imgArray[randIndex]}")`;
        }, 1000);
    }
}
randomizeBackground();

// Bullet navigation and localStorage for bullets
const bullets = document.querySelectorAll(".navbuulet .bullt");
let bulletDisplay = localStorage.getItem("bults-oppp");
document.querySelector(".navbuulet").style.display = bulletDisplay || "block";
document.querySelector(`.bults-op .${bulletDisplay === "block" ? "yes" : "no"}`).classList.add('active');

document.querySelectorAll(".bults-op span").forEach(span => {
    span.addEventListener("click", e => {
        const display = span.dataset.display === "show" ? "block" : "none";
        document.querySelector(".navbuulet").style.display = display;
        localStorage.setItem("bults-oppp", display);
        handleActive(e);
    });
});

// Scroll to section
function scrollToSection(elements) {
    elements.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({ behavior: "smooth" });
        });
    });
}
scrollToSection(bullets);
scrollToSection(document.querySelectorAll(".link a"));

// Handle active status
function handleActive(event) {
    event.target.parentElement.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
    event.target.classList.add("active");
}

// Reset settings
document.querySelector(".setingbox button").onclick = () => {
    localStorage.clear();
    window.location.reload();
};

// Animate skill bars on scroll
window.onscroll = function() {
    document.querySelectorAll(".skilbox").forEach(skill => {
        let offsetTop = skill.offsetTop;
        if (window.pageYOffset > offsetTop - window.innerHeight) {
            skill.querySelectorAll("span").forEach(span => span.style.width = span.dataset.prog);
        }
    });
};

// Gallery popup
document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = "popbox";

        if (img.alt) {
            let imgHeader = document.createElement("h3");
            imgHeader.textContent = img.alt;
            popupBox.appendChild(imgHeader);
        }

        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);

        let closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.textContent = "close";
        popupBox.appendChild(closeButton);

        closeButton.onclick = closePopup;
        overlay.onclick = closePopup;

        document.body.appendChild(popupBox);
    });
});

// Close popup
function closePopup() {
    document.querySelector(".overlay").remove();
    document.querySelector(".popbox").remove();
}

// toogle class to open links in munue
document.querySelector('.toogle-menu').addEventListener('click', function() {
    document.querySelector('.link').classList.toggle('open');
});
// toogle class to open tplip under menue
document.querySelector('.toogle-menu').addEventListener('click', function() {
    this.classList.toggle('toactive'); // إضافة أو إزالة الفئة toactive عند النقر
});

    // handle bar links in case scrool
    const header = document.querySelector('.link');
    let scrooltop=0;
    window.addEventListener('scroll', function() {
        const curentscrol=window.scrollY;

        if (curentscrol > scrooltop) {
            header.classList.add('fixed'); // إضافة الفئة "fixed" عندما نصل للمسافة المحددة
        } else {
            header.classList.remove('fixed'); // إزالة الفئة "fixed" عند العودة للأعلى
        }
        scrooltop=curentscrol<=0 ? 0:curentscrol;
    });


