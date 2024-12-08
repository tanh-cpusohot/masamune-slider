const slider = document.querySelector('.slider');
const beforeImage = document.querySelector('.before-image');
const afterImage = document.querySelector('.after-image');

let isDragging = false;

// Khi bắt đầu kéo
slider.addEventListener('mousedown', () => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
});

slider.addEventListener('touchstart', () => {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
});

// Hàm xử lý di chuyển thanh trượt và ảnh
const handleMove = (x) => {
    const container = document.querySelector('.image-comparison-container');
    const rect = container.getBoundingClientRect();

    // Xác định vị trí x trong phạm vi container
    let offsetX = x - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    // Cập nhật vị trí thanh trượt
    slider.style.left = `${offsetX}px`;

    // Đồng bộ ảnh "after" với thanh trượt
    const percentage = (offsetX / rect.width) * 100;
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
};

// Xử lý sự kiện kéo bằng chuột
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        handleMove(e.clientX);
    }
});

// Xử lý sự kiện kéo bằng cảm ứng
document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        handleMove(e.touches[0].clientX);
    }
});

// Khi thả chuột hoặc cảm ứng
const stopDragging = () => {
    isDragging = false;
    document.body.style.cursor = 'default';
};

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);