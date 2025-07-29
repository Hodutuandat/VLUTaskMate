// VLUTaskMate - Main JavaScript File
// Updated for centralized authentication system and mock data

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication first
    checkAuthentication();
    
    // Initialize all components
    initModals();
    initTabs();
    initUserMenu();
    initNotifications();
    initDragDrop();
    initComments();
    initSubtaskCheckboxes();
    initCloseProject();
    initMemberInvitation();
    initProjectDateValidation();
    initKickMember();
    initAddCard();
    initTaskDetail();
    initTaskDetailControls();
    initAuthentication();
});

// Authentication System
function checkAuthentication() {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        // Redirect to login if no user info
        if (window.location.pathname !== '/login.html' && !window.location.pathname.includes('login.html')) {
            window.location.href = '../login.html';
        }
        return;
    }

    const user = JSON.parse(userInfo);
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

    if (hoursDiff >= 24) {
        // Session expired
        localStorage.removeItem('userInfo');
        window.location.href = '../login.html';
        return;
    }

    // Update user info in header if elements exist
    updateUserInfo(user);
}

function updateUserInfo(user) {
    const userNameElements = document.querySelectorAll('#userName');
    const userEmailElements = document.querySelectorAll('#userEmail');
    
    userNameElements.forEach(element => {
        if (element) element.textContent = user.name;
    });
    
    userEmailElements.forEach(element => {
        if (element) element.textContent = user.email;
    });
}

function initAuthentication() {
    // Logout functionality
    const logoutLinks = document.querySelectorAll('a[href="../logout.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('userInfo');
            window.location.href = '../logout.html';
        });
    });
}

// Mock Data for VLUTaskMate
const mockData = {
    projects: {
        'library-system': {
            id: 'library-system',
            name: 'Hệ thống Quản lý Thư viện',
            status: 'active',
            role: 'leader',
            members: 5,
            startDate: '2024-12-01',
            endDate: '2024-12-15',
            teacher: 'TS. Nguyễn Văn A',
            class: 'CNTT-K15',
            semester: 'Học kỳ 1 - Năm học 2024-2025'
        },
        'ecommerce-website': {
            id: 'ecommerce-website',
            name: 'Website E-commerce',
            status: 'completed',
            role: 'leader',
            members: 6,
            startDate: '2024-11-01',
            endDate: '2024-11-10',
            teacher: 'ThS. Trần Thị B',
            class: 'CNTT-K15',
            semester: 'Học kỳ 1 - Năm học 2024-2025'
        },
        'mobile-banking': {
            id: 'mobile-banking',
            name: 'Ứng dụng Mobile Banking',
            status: 'active',
            role: 'member',
            members: 4,
            startDate: '2024-12-05',
            endDate: '2024-12-20',
            teacher: 'PGS.TS. Lê Văn C',
            class: 'CNTT-K15',
            semester: 'Học kỳ 1 - Năm học 2024-2025'
        }
    },
    tasks: {
        'task-1': {
            id: 'task-1',
            title: 'Thiết kế giao diện',
            description: 'Thiết kế giao diện người dùng cho ứng dụng',
            status: 'in-progress',
            priority: 'high',
            assignee: 'Hồ Du Tuấn Đạt',
            dueDate: '2024-12-10',
            subtasks: [
                { id: 'sub-1', title: 'Wireframe', completed: true },
                { id: 'sub-2', title: 'UI Design', completed: false },
                { id: 'sub-3', title: 'Prototype', completed: false }
            ]
        },
        'task-2': {
            id: 'task-2',
            title: 'Phát triển backend',
            description: 'Xây dựng API và database',
            status: 'todo',
            priority: 'medium',
            assignee: 'Nguyễn Văn A',
            dueDate: '2024-12-12',
            subtasks: [
                { id: 'sub-4', title: 'Database Design', completed: false },
                { id: 'sub-5', title: 'API Development', completed: false }
            ]
        }
    },
    notifications: [
        {
            id: 'notif-1',
            type: 'task-assignment',
            title: 'Bạn được giao nhiệm vụ mới',
            message: '"Thiết kế giao diện" trong dự án Website E-commerce',
            time: '2 phút trước',
            read: false
        },
        {
            id: 'notif-2',
            type: 'group-invitation',
            title: 'Lời mời tham gia nhóm',
            message: 'Bạn được mời tham gia dự án "Hệ thống Quản lý Thư viện"',
            time: '15 phút trước',
            read: false
        }
    ]
};

// Modal Management
function initModals() {
    // Create Project Modal
    const createProjectBtn = document.getElementById('createProjectBtn');
    const createProjectModal = document.getElementById('createProjectModal');
    const closeCreateModal = document.getElementById('closeCreateModal');
    const cancelCreateProject = document.getElementById('cancelCreateProject');

    if (createProjectBtn && createProjectModal) {
        createProjectBtn.addEventListener('click', () => {
            createProjectModal.classList.remove('hidden');
        });
    }

    if (closeCreateModal && createProjectModal) {
        closeCreateModal.addEventListener('click', () => {
            createProjectModal.classList.add('hidden');
        });
    }

    if (cancelCreateProject && createProjectModal) {
        cancelCreateProject.addEventListener('click', () => {
            createProjectModal.classList.add('hidden');
        });
    }

    // Close modal when clicking outside
    if (createProjectModal) {
        createProjectModal.addEventListener('click', (e) => {
            if (e.target === createProjectModal) {
                createProjectModal.classList.add('hidden');
            }
        });
    }

    // Invite Member Modal
    const inviteMemberBtn = document.getElementById('inviteMemberBtn');
    const inviteMemberModal = document.getElementById('inviteMemberModal');
    const closeInviteModal = document.getElementById('closeInviteModal');
    const cancelInvite = document.getElementById('cancelInvite');

    if (inviteMemberBtn && inviteMemberModal) {
        inviteMemberBtn.addEventListener('click', () => {
            inviteMemberModal.classList.remove('hidden');
        });
    }

    if (closeInviteModal && inviteMemberModal) {
        closeInviteModal.addEventListener('click', () => {
            inviteMemberModal.classList.add('hidden');
        });
    }

    if (cancelInvite && inviteMemberModal) {
        cancelInvite.addEventListener('click', () => {
            inviteMemberModal.classList.add('hidden');
        });
    }

    // Create Task Modal
    const createTaskBtn = document.getElementById('createTaskBtn');
    const createTaskModal = document.getElementById('createTaskModal');
    const closeTaskModal = document.getElementById('closeTaskModal');
    const cancelTask = document.getElementById('cancelTask');

    if (createTaskBtn && createTaskModal) {
        createTaskBtn.addEventListener('click', () => {
            createTaskModal.classList.remove('hidden');
        });
    }

    if (closeTaskModal && createTaskModal) {
        closeTaskModal.addEventListener('click', () => {
            createTaskModal.classList.add('hidden');
        });
    }

    if (cancelTask && createTaskModal) {
        cancelTask.addEventListener('click', () => {
            createTaskModal.classList.add('hidden');
        });
    }

    // Add Subtask Modal
    const addSubtaskBtn = document.getElementById('addSubtaskBtn');
    const addSubtaskModal = document.getElementById('addSubtaskModal');
    const closeSubtaskModal = document.getElementById('closeSubtaskModal');
    const cancelSubtask = document.getElementById('cancelSubtask');

    if (addSubtaskBtn && addSubtaskModal) {
        addSubtaskBtn.addEventListener('click', () => {
            addSubtaskModal.classList.remove('hidden');
        });
    }

    if (closeSubtaskModal && addSubtaskModal) {
        closeSubtaskModal.addEventListener('click', () => {
            addSubtaskModal.classList.add('hidden');
        });
    }

    if (cancelSubtask && addSubtaskModal) {
        cancelSubtask.addEventListener('click', () => {
            addSubtaskModal.classList.add('hidden');
        });
    }
}

// Tab Management
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button, .project-detail-tab-button');
    const tabContents = document.querySelectorAll('.tab-content, .tab-content-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and target content
            button.classList.add('active');
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// User Menu Management
function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenuDropdown = document.getElementById('userMenuDropdown');

    if (userMenuBtn && userMenuDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenuDropdown.classList.toggle('hidden');
        });

        // Close when clicking outside
        document.addEventListener('click', function(event) {
            if (!userMenuBtn.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                userMenuDropdown.classList.add('hidden');
            }
        });
    }
}

// Notification Management
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const closeNotifications = document.getElementById('closeNotifications');

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
        });
    }

    if (closeNotifications && notificationDropdown) {
        closeNotifications.addEventListener('click', function() {
            notificationDropdown.classList.add('hidden');
        });
    }

    // Close when clicking outside
    document.addEventListener('click', function(event) {
        if (notificationBtn && notificationDropdown && 
            !notificationBtn.contains(event.target) && 
            !notificationDropdown.contains(event.target)) {
            notificationDropdown.classList.add('hidden');
        }
    });
}

// Drag and Drop for Kanban Board
function initDragDrop() {
    const kanbanColumns = document.querySelectorAll('.kanban-column');
    
    kanbanColumns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            column.classList.add('drag-over');
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('drag-over');
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('drag-over');
            
            const taskId = e.dataTransfer.getData('text/plain');
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            
            if (taskElement) {
                const newStatus = column.getAttribute('data-status');
                moveTask(taskElement, column, newStatus);
            }
        });
    });

    // Make task cards draggable
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        card.setAttribute('draggable', true);
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.getAttribute('data-task-id'));
        });
    });
}

function moveTask(taskElement, targetColumn, newStatus) {
    // Check user permissions
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const taskAssignee = taskElement.getAttribute('data-assignee');
    
    if (userInfo.role === 'student' && taskAssignee !== userInfo.name) {
        showNotification('Không có quyền', 'Bạn chỉ có thể di chuyển task của mình');
        return;
    }

    targetColumn.appendChild(taskElement);
    taskElement.setAttribute('data-status', newStatus);
    
    // Update task count
    updateTaskCount(targetColumn);
    
    showNotification('Thành công', 'Task đã được di chuyển');
}

function updateTaskCount(column) {
    const taskCount = column.querySelectorAll('.task-card').length;
    const countElement = column.querySelector('.task-count');
    if (countElement) {
        countElement.textContent = taskCount;
    }
}

// Comments Management
function initComments() {
    const commentForms = document.querySelectorAll('.comment-form');
    
    commentForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const textarea = form.querySelector('textarea');
            const commentText = textarea.value.trim();
            
            if (commentText) {
                addComment(commentText, form);
                textarea.value = '';
            }
        });
    });
}

function addComment(text, form) {
    const commentsContainer = form.closest('.comments-section').querySelector('.comments-list');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-700">${userInfo.name ? userInfo.name.charAt(0) : 'U'}</span>
                </div>
            </div>
            <div class="flex-1">
                <div class="bg-gray-50 rounded-lg px-3 py-2">
                    <p class="text-sm text-gray-900">${text}</p>
                </div>
                <p class="text-xs text-gray-500 mt-1">${userInfo.name || 'User'} • ${new Date().toLocaleString('vi-VN')}</p>
            </div>
        </div>
    `;
    
    commentsContainer.appendChild(commentElement);
}

// Subtask Management
function initSubtaskCheckboxes() {
    const subtaskCheckboxes = document.querySelectorAll('.subtask-checkbox');
    
    subtaskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const subtaskItem = checkbox.closest('.subtask-item');
            const subtaskText = subtaskItem.querySelector('.subtask-text');
            
            if (checkbox.checked) {
                subtaskText.classList.add('line-through', 'text-gray-500');
            } else {
                subtaskText.classList.remove('line-through', 'text-gray-500');
            }
            
            updateSubtaskProgress(subtaskItem.closest('.subtasks-section'));
        });
    });
}

function updateSubtaskProgress(container) {
    const checkboxes = container.querySelectorAll('.subtask-checkbox');
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    
    const progressElement = container.querySelector('.subtask-progress');
    if (progressElement) {
        progressElement.textContent = `${completed}/${total}`;
    }
}

// Project Management
function initCloseProject() {
    const closeProjectBtns = document.querySelectorAll('.close-project-btn');
    
    closeProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Bạn có chắc chắn muốn đóng dự án này?')) {
                showNotification('Thành công', 'Dự án đã được đóng');
                // Add logic to close project
            }
        });
    });
}

// Member Invitation
function initMemberInvitation() {
    const inviteForms = document.querySelectorAll('.invite-member-form');
    
    inviteForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                inviteMember(email, form);
                emailInput.value = '';
            }
        });
    });
}

function inviteMember(email, form) {
    // Simulate invitation
    showNotification('Thành công', `Lời mời đã được gửi đến ${email}`);
    
    // Add to invited members list
    const invitedList = form.closest('.invite-section').querySelector('.invited-members-list');
    if (invitedList) {
        const memberItem = document.createElement('div');
        memberItem.className = 'flex items-center justify-between p-2 bg-gray-50 rounded';
        memberItem.innerHTML = `
            <span class="text-sm text-gray-700">${email}</span>
            <button type="button" class="text-red-500 hover:text-red-700" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        invitedList.appendChild(memberItem);
    }
}

// Project Date Validation
function initProjectDateValidation() {
    const startDateInputs = document.querySelectorAll('input[name="startDate"]');
    const endDateInputs = document.querySelectorAll('input[name="endDate"]');
    
    startDateInputs.forEach(input => {
        input.addEventListener('change', () => {
            const endDateInput = input.closest('form').querySelector('input[name="endDate"]');
            if (endDateInput && input.value > endDateInput.value) {
                endDateInput.value = input.value;
            }
        });
    });
    
    endDateInputs.forEach(input => {
        input.addEventListener('change', () => {
            const startDateInput = input.closest('form').querySelector('input[name="startDate"]');
            if (startDateInput && input.value < startDateInput.value) {
                alert('Ngày kết thúc phải sau ngày bắt đầu');
                input.value = startDateInput.value;
            }
        });
    });
}

// Kick Member
function initKickMember() {
    const kickMemberBtns = document.querySelectorAll('.kick-member-btn');
    
    kickMemberBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const memberName = btn.getAttribute('data-member');
            if (confirm(`Bạn có chắc chắn muốn loại ${memberName} khỏi dự án?`)) {
                btn.closest('.member-item').remove();
                showNotification('Thành công', `${memberName} đã bị loại khỏi dự án`);
            }
        });
    });
}

// Add Card to Kanban
function initAddCard() {
    const addCardBtns = document.querySelectorAll('.add-card-btn');
    
    addCardBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const column = btn.closest('.kanban-column');
            const status = column.getAttribute('data-status');
            showAddTaskModal(status);
        });
    });
}

function showAddTaskModal(status) {
    const modal = document.getElementById('createTaskModal');
    if (modal) {
        modal.classList.remove('hidden');
        // Set default status
        const statusSelect = modal.querySelector('select[name="status"]');
        if (statusSelect) {
            statusSelect.value = status;
        }
    }
}

// Task Detail Management
function initTaskDetail() {
    const taskCards = document.querySelectorAll('.task-card');
    
    taskCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.task-actions')) {
                openTaskDetail(card);
            }
        });
    });
}

function openTaskDetail(card) {
    const taskId = card.getAttribute('data-task-id');
    const task = mockData.tasks[taskId] || {
        title: 'Task mới',
        description: 'Mô tả task',
        status: 'todo',
        priority: 'medium',
        assignee: 'Chưa phân công'
    };
    
    const modal = document.getElementById('taskDetailModal');
    if (modal) {
        // Populate modal with task data
        modal.querySelector('.task-title').textContent = task.title;
        modal.querySelector('.task-description').textContent = task.description;
        modal.querySelector('.task-status').textContent = task.status;
        modal.querySelector('.task-priority').textContent = task.priority;
        modal.querySelector('.task-assignee').textContent = task.assignee;
        
        modal.classList.remove('hidden');
    }
}

// Task Detail Controls
function initTaskDetailControls() {
    const taskDetailModal = document.getElementById('taskDetailModal');
    if (!taskDetailModal) return;
    
    const closeBtn = taskDetailModal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            taskDetailModal.classList.add('hidden');
        });
    }
    
    // Close when clicking outside
    taskDetailModal.addEventListener('click', (e) => {
        if (e.target === taskDetailModal) {
            taskDetailModal.classList.add('hidden');
        }
    });
}

// Utility Functions
function showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300 translate-x-full';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-check-circle"></i>
            <div>
                <div class="font-medium">${title}</div>
                <div class="text-sm opacity-90">${message}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Form submission handler
function handleFormSubmission(formId, successMessage) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Đang xử lý...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thành công', successMessage);
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Close modal if exists
                const modal = form.closest('.modal');
                if (modal) {
                    modal.classList.add('hidden');
                }
            }, 1000);
        });
    }
}

// Initialize form submissions
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission('createProjectForm', 'Dự án đã được tạo thành công!');
    handleFormSubmission('createTaskForm', 'Task đã được tạo thành công!');
    handleFormSubmission('addSubtaskForm', 'Subtask đã được thêm thành công!');
});

// Export functions for global use
window.VLUTaskMate = {
    showNotification,
    mockData,
    checkAuthentication,
    updateUserInfo
}; 