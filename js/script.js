document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('login-page');
    const appContent = document.getElementById('app-content');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const logoutButtonMobile = document.getElementById('logoutButtonMobile');
    const userInfo = document.getElementById('userInfo');
    const userDropdown = document.getElementById('userDropdown');
    const mainNavbarLinks = document.getElementById('main-navbar-links');
    const pageContents = document.querySelectorAll('.page-content');
    const tabButtons = document.querySelectorAll('.tabs .tab-button');
    const tabContentPanes = document.querySelectorAll('.tab-content-pane');
    const viewProjectButtons = document.querySelectorAll('.project-card .view-button');
    const projectDetailTabs = document.querySelectorAll('.project-detail-tabs .project-detail-tab-button');
    const projectDetailTabContents = document.querySelectorAll('.tab-content');
    const taskDetailModal = document.getElementById('taskDetailModal');
    const modalCloseButton = taskDetailModal.querySelector('.modal-close-button');
    const kanbanColumns = document.querySelectorAll('.kanban-column');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const closeMobileNav = document.getElementById('closeMobileNav');

    let currentDraggedTask = null;

    // --- Authentication Logic ---
    const isAuthenticated = () => localStorage.getItem('isLoggedIn') === 'true';

    const showPage = (pageId) => {
        pageContents.forEach(page => {
            page.classList.remove('active');
            if (page.id === pageId) {
                page.classList.add('active');
            }
        });

        mainNavbarLinks.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.page === pageId.replace('-page', '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        if (mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            mobileNavOverlay.style.display = 'none';
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // In a real app, this would send credentials to a server
        // For prototype, just simulate success
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (email && password) { // Simple validation
            localStorage.setItem('isLoggedIn', 'true');
            loginPage.style.display = 'none';
            appContent.style.display = 'block';
            showPage('dashboard-page'); // Default to dashboard after login
        } else {
            alert('Vui lòng nhập email/MSSV và mật khẩu.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        appContent.style.display = 'none';
        loginPage.style.display = 'flex';
        // Close mobile nav if open
        if (mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            mobileNavOverlay.style.display = 'none';
        }
    };

    loginForm.addEventListener('submit', handleLogin);
    logoutButton.addEventListener('click', handleLogout);
    logoutButtonMobile.addEventListener('click', handleLogout);

    // Check authentication on load
    if (isAuthenticated()) {
        loginPage.style.display = 'none';
        appContent.style.display = 'block';
        showPage('dashboard-page');
    } else {
        loginPage.style.display = 'flex';
        appContent.style.display = 'none';
    }

    // --- Navbar & Page Navigation ---
    mainNavbarLinks.addEventListener('click', (e) => {
        if (e.target.matches('.nav-link')) {
            e.preventDefault();
            showPage(e.target.dataset.page + '-page');
        }
    });

    // User dropdown toggle
    userInfo.addEventListener('click', () => {
        userDropdown.classList.toggle('show');
    });

    // Close dropdown if click outside
    window.addEventListener('click', (e) => {
        if (!userInfo.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
    });

    // --- My Projects Tabs ---
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContentPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(button.dataset.tab + '-content').classList.add('active');
        });
    });

    // --- Project Detail Tabs ---
    projectDetailTabs.forEach(button => {
        button.addEventListener('click', () => {
            projectDetailTabs.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projectDetailTabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(button.dataset.detailTab + '-tab-content').classList.add('active');
        });
    });

    // Simulate "View Project" click
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            // In a real app, you'd load project data based on projectId
            // For prototype, just switch to the page and update dummy info
            document.getElementById('project-detail-title').textContent = button.closest('.project-card').querySelector('h4').textContent;
            document.getElementById('project-detail-desc').textContent = button.closest('.project-card').querySelector('p:nth-of-type(1)').textContent + ' | ' + button.closest('.project-card').querySelector('p:nth-of-type(2)').textContent;

            showPage('project-detail-page');
            // Reset to Tasks tab when viewing a project
            document.querySelector('.project-detail-tab-button[data-detail-tab="tasks"]').click();
        });
    });

    // --- Task Detail Modal ---
    document.addEventListener('click', (e) => {
        if (e.target.closest('.task-card')) {
            const taskCard = e.target.closest('.task-card');
            const taskId = taskCard.dataset.taskId;
            // Simulate loading task data
            document.getElementById('modalTaskTitle').textContent = taskCard.querySelector('h5').textContent;
            document.getElementById('modalTaskDescription').textContent = 'Mô tả chi tiết cho task ' + taskId + '.';
            document.getElementById('modalTaskDeadline').textContent = taskCard.querySelector('p:nth-of-type(1)').textContent.replace('Deadline: ', '');
            document.getElementById('modalTaskAssignee').textContent = taskCard.querySelector('.badge.assignee').textContent;
            document.getElementById('modalTaskStatus').textContent = taskCard.querySelector('.badge.status').textContent;

            // Dummy subtasks and comments
            document.getElementById('modalSubtaskList').innerHTML = `
                <li><input type="checkbox"> Subtask A</li>
                <li><input type="checkbox" checked> Subtask B đã xong</li>
            `;
            document.getElementById('modalTaskComments').innerHTML = `
                <div class="comment-item">
                    <img src="https://via.placeholder.com/40" alt="Avatar" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-meta"><strong>Nguyễn Văn A</strong> - 27/07/2025 14:00</div>
                        <p>Đã bắt đầu làm task này.</p>
                    </div>
                </div>
                <div class="comment-item">
                    <img src="https://via.placeholder.com/40" alt="Avatar" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-meta"><strong>Lê Thị B</strong> - 27/07/2025 15:30</div>
                        <p>Cố gắng hoàn thành trước deadline nhé!</p>
                    </div>
                </div>
                <div class="comment-input-area" style="margin-top: 1rem;">
                    <textarea placeholder="Viết bình luận..."></textarea>
                    <button class="primary">Gửi</button>
                </div>
            `;

            taskDetailModal.classList.add('show');
        }
    });

    modalCloseButton.addEventListener('click', () => {
        taskDetailModal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === taskDetailModal) {
            taskDetailModal.classList.remove('show');
        }
    });

    // --- Kanban Drag and Drop (Simplified) ---
    kanbanColumns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            if (currentDraggedTask) {
                column.appendChild(currentDraggedTask);
                // Update status visually (can be done with classes too)
                const statusBadge = currentDraggedTask.querySelector('.badge.status');
                if (column.id === 'column-todo') {
                    statusBadge.textContent = 'Mới';
                    statusBadge.style.backgroundColor = getCssVar('--secondary-color');
                } else if (column.id === 'column-in-progress') {
                    statusBadge.textContent = 'Đang làm';
                    statusBadge.style.backgroundColor = getCssVar('--primary-color');
                } else if (column.id === 'column-done') {
                    statusBadge.textContent = 'Đã xong';
                    statusBadge.style.backgroundColor = getCssVar('--success-color');
                }
                currentDraggedTask = null;
            }
        });
    });

    document.querySelectorAll('.task-card').forEach(task => {
        task.addEventListener('dragstart', (e) => {
            currentDraggedTask = task;
            e.dataTransfer.effectAllowed = 'move';
        });

        task.addEventListener('dragend', () => {
            currentDraggedTask = null;
        });
    });

    // Get CSS Variables for dynamic styling in JS
    const getCssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();


    // --- Mobile Navigation (Hamburger) ---
    hamburgerMenu.addEventListener('click', () => {
        mobileNav.classList.add('open');
        mobileNavOverlay.style.display = 'block';
    });

    closeMobileNav.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileNavOverlay.style.display = 'none';
    });

    mobileNavOverlay.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileNavOverlay.style.display = 'none';
    });
});