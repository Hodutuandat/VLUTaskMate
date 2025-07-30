// VLUTaskMate - Main JavaScript File
// Updated for centralized authentication system and mock data

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing VLUTaskMate...');
    
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
    initProjectStatus(); // Initialize project status management
    initLeaveGroup(); // Initialize leave group functionality
    
    console.log('VLUTaskMate initialization completed');
});

// Authentication System
function checkAuthentication() {
    console.log('Checking authentication...');
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        console.log('No user info found, redirecting to login...');
        // Redirect to login if no user info
        if (window.location.pathname !== '/login.html' && !window.location.pathname.includes('login.html')) {
            // Temporarily disable redirect for testing
            console.log('Would redirect to login, but disabled for testing');
            // window.location.href = '../login.html';
        }
        return;
    }

    try {
        const user = JSON.parse(userInfo);
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

        if (hoursDiff >= 24) {
            console.log('Session expired, redirecting to login...');
            localStorage.removeItem('userInfo');
            // Temporarily disable redirect for testing
            console.log('Would redirect to login, but disabled for testing');
            // window.location.href = '../login.html';
            return;
        }

        console.log('User authenticated:', user.name);
        // Update user info in header if elements exist
        updateUserInfo(user);
    } catch (error) {
        console.error('Error parsing user info:', error);
    }
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
    const tabButtons = document.querySelectorAll('.tab-btn, .tab-button, .project-detail-tab-button');
    const tabContents = document.querySelectorAll('.tab-content, .tab-content-pane');

    if (tabButtons.length === 0) {
        console.log('No tab buttons found');
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = button.getAttribute('data-tab');
            
            if (!targetTab) {
                console.warn('Tab button missing data-tab attribute:', button);
                return;
            }
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('border-vlu-red', 'text-vlu-red');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            button.classList.remove('border-transparent', 'text-gray-500');
            button.classList.add('border-vlu-red', 'text-vlu-red');
            
            // Show target content
            const targetContent = document.querySelector(`[data-tab-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.classList.remove('hidden');
            } else {
                console.warn(`Tab content not found for: ${targetTab}`);
            }
        });
    });
}

// User Menu Management
function initUserMenu() {
    console.log('Initializing user menu...');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenuDropdown = document.getElementById('userMenuDropdown');

    console.log('User menu elements:', { userMenuBtn, userMenuDropdown });

    if (userMenuBtn && userMenuDropdown) {
        // Remove any existing event listeners
        const newUserMenuBtn = userMenuBtn.cloneNode(true);
        userMenuBtn.parentNode.replaceChild(newUserMenuBtn, userMenuBtn);
        
        newUserMenuBtn.addEventListener('click', function(e) {
            console.log('User menu button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = userMenuDropdown.classList.contains('hidden');
            if (isHidden) {
                userMenuDropdown.classList.remove('hidden');
                console.log('User menu dropdown shown');
            } else {
                userMenuDropdown.classList.add('hidden');
                console.log('User menu dropdown hidden');
            }
        });

        // Close when clicking outside
        document.addEventListener('click', function(event) {
            if (!newUserMenuBtn.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                userMenuDropdown.classList.add('hidden');
                console.log('User menu closed by outside click');
            }
        });
        
        console.log('User menu initialized successfully');
    } else {
        console.warn('User menu elements not found');
    }
}

// Notification Management
function initNotifications() {
    console.log('Initializing notifications...');
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const closeNotifications = document.getElementById('closeNotifications');

    console.log('Notification elements:', { notificationBtn, notificationDropdown, closeNotifications });

    if (notificationBtn && notificationDropdown) {
        // Remove any existing event listeners
        const newNotificationBtn = notificationBtn.cloneNode(true);
        notificationBtn.parentNode.replaceChild(newNotificationBtn, notificationBtn);
        
        newNotificationBtn.addEventListener('click', function(e) {
            console.log('Notification button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = notificationDropdown.classList.contains('hidden');
            if (isHidden) {
                notificationDropdown.classList.remove('hidden');
                console.log('Notification dropdown shown');
            } else {
                notificationDropdown.classList.add('hidden');
                console.log('Notification dropdown hidden');
            }
        });
    } else {
        console.warn('Notification button or dropdown not found');
    }

    if (closeNotifications && notificationDropdown) {
        closeNotifications.addEventListener('click', function(e) {
            console.log('Close notifications button clicked');
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.add('hidden');
        });
    } else {
        console.warn('Close notifications button not found');
    }

    // Close when clicking outside
    document.addEventListener('click', function(event) {
        if (notificationBtn && notificationDropdown && 
            !notificationBtn.contains(event.target) && 
            !notificationDropdown.contains(event.target)) {
            notificationDropdown.classList.add('hidden');
            console.log('Notification dropdown closed by outside click');
        }
    });
    
    console.log('Notifications initialized successfully');
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
    // Validate VLU email format
    if (!email.endsWith('@vlu.edu.vn')) {
        showNotification('Lỗi', 'Vui lòng nhập email VLU hợp lệ (email@vlu.edu.vn)');
        return;
    }
    
    // Check if member already exists
    const invitedList = form.closest('.invite-section').querySelector('.invited-members-list');
    if (invitedList) {
        const existingMembers = invitedList.querySelectorAll('.member-item');
        for (let member of existingMembers) {
            const memberEmail = member.querySelector('.member-email').textContent;
            if (memberEmail === email) {
                showNotification('Lỗi', 'Thành viên này đã được mời!');
                return;
            }
        }
    }
    
    // Simulate invitation
    showNotification('Thành công', `Lời mời đã được gửi đến ${email}`);
    
    // Add to invited members list
    if (invitedList) {
        const memberItem = document.createElement('div');
        memberItem.className = 'member-item flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200';
        memberItem.innerHTML = `
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-blue-600 text-sm"></i>
                </div>
                <div>
                    <div class="flex items-center space-x-2">
                        <span class="member-email text-sm font-medium text-gray-700">${email}</span>
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <i class="fas fa-clock mr-1"></i>
                            Pending
                        </span>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Đã gửi lời mời</p>
                </div>
            </div>
            <button type="button" class="remove-member-btn text-red-500 hover:text-red-700 transition-colors" onclick="removeInvitedMember(this)" title="Xóa thành viên">
                <i class="fas fa-times"></i>
            </button>
        `;
        invitedList.appendChild(memberItem);
    }
}

// Function to remove invited member
function removeInvitedMember(button) {
    const memberItem = button.closest('.member-item');
    const email = memberItem.querySelector('.member-email').textContent;
    
    if (confirm(`Bạn có chắc chắn muốn xóa lời mời cho ${email}?`)) {
        memberItem.remove();
        showNotification('Thành công', `Đã xóa lời mời cho ${email}`);
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
    console.log('Initializing add card functionality...');
    const addCardBtns = document.querySelectorAll('.add-card-btn');
    
    console.log('Found add card buttons:', addCardBtns.length);
    
    addCardBtns.forEach((btn, index) => {
        console.log(`Setting up add card button ${index + 1}:`, btn);
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Add card button clicked:', btn);
            
            const column = btn.closest('.kanban-column');
            const status = column ? column.getAttribute('data-status') : btn.getAttribute('data-column');
            
            console.log('Column status:', status);
            showAddTaskModal(status);
        });
    });
    
    console.log('Add card functionality initialized successfully');
}

function showAddTaskModal(status) {
    console.log('Showing add task modal with status:', status);
    const modal = document.getElementById('createTaskModal');
    
    if (modal) {
        modal.classList.remove('hidden');
        console.log('Modal shown successfully');
        
        // Set default status
        const statusSelect = modal.querySelector('select[name="status"]');
        if (statusSelect && status) {
            statusSelect.value = status;
            console.log('Status set to:', status);
        }
    } else {
        console.warn('Create task modal not found!');
        // Show a simple alert as fallback
        alert('Modal không tìm thấy. Vui lòng thử lại.');
    }
}

// Task Detail Management
function initTaskDetail() {
    console.log('Initializing task detail functionality...');
    const taskCards = document.querySelectorAll('.task-card');
    
    console.log('Found task cards:', taskCards.length);
    
    taskCards.forEach((card, index) => {
        console.log(`Setting up task card ${index + 1}:`, card);
        
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if click is on task actions (ellipsis button)
            if (!e.target.closest('.task-actions') && !e.target.closest('button')) {
                console.log('Task card clicked:', card);
                openTaskDetail(card);
            }
        });
    });
    
    console.log('Task detail functionality initialized successfully');
}

function openTaskDetail(card) {
    console.log('Opening task detail for card:', card);
    
    const taskId = card.getAttribute('data-task-id');
    const taskTitle = card.getAttribute('data-task-title');
    const taskDescription = card.getAttribute('data-task-description');
    const taskType = card.getAttribute('data-task-type');
    const taskPriority = card.getAttribute('data-task-priority');
    
    console.log('Task data:', { taskId, taskTitle, taskDescription, taskType, taskPriority });
    
    const modal = document.getElementById('taskDetailModal');
    if (modal) {
        // Populate modal with task data using IDs
        const titleElement = document.getElementById('taskDetailTitle');
        const descriptionElement = document.getElementById('taskDescription');
        
        if (titleElement) {
            titleElement.textContent = taskTitle || 'Task mới';
            console.log('Title set to:', taskTitle);
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = taskDescription || 'Mô tả task';
            console.log('Description set to:', taskDescription);
        }
        
        // Set status if available
        const statusSelect = document.getElementById('taskStatus');
        if (statusSelect) {
            // You can set default status based on task data
            console.log('Status select found');
        }
        
        modal.classList.remove('hidden');
        console.log('Task detail modal shown successfully');
    } else {
        console.warn('Task detail modal not found!');
        // Show a simple alert as fallback
        alert('Modal chi tiết task không tìm thấy. Vui lòng thử lại.');
    }
}

// Task Detail Controls
function initTaskDetailControls() {
    console.log('Initializing task detail controls...');
    const taskDetailModal = document.getElementById('taskDetailModal');
    
    if (!taskDetailModal) {
        console.warn('Task detail modal not found');
        return;
    }
    
    // Close button
    const closeBtn = document.getElementById('closeTaskDetailModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close task detail modal clicked');
            taskDetailModal.classList.add('hidden');
        });
        console.log('Close button initialized');
    } else {
        console.warn('Close button not found');
    }
    
    // Close when clicking outside
    taskDetailModal.addEventListener('click', (e) => {
        if (e.target === taskDetailModal) {
            console.log('Task detail modal closed by outside click');
            taskDetailModal.classList.add('hidden');
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !taskDetailModal.classList.contains('hidden')) {
            console.log('Task detail modal closed by Escape key');
            taskDetailModal.classList.add('hidden');
        }
    });
    
    console.log('Task detail controls initialized successfully');
}

// Project Status Management
function initProjectStatus() {
    console.log('Initializing project status management...');
    
    // Check for existing project badge to determine status
    const projectBadge = document.querySelector('.project-status-badge, [class*="badge"]');
    let detectedStatus = 'active';
    let detectedProgress = 75;
    
    if (projectBadge) {
        const badgeText = projectBadge.textContent;
        console.log('Found project badge:', badgeText);
        
        if (badgeText.includes('Đã hoàn tất') || badgeText.includes('Completed') || badgeText.includes('hoàn thành')) {
            detectedStatus = 'completed';
            detectedProgress = 100;
            console.log('Project detected as completed from badge');
        } else if (badgeText.includes('Đã hủy') || badgeText.includes('Cancelled') || badgeText.includes('hủy')) {
            detectedStatus = 'cancelled';
            detectedProgress = 30;
            console.log('Project detected as cancelled from badge');
        } else {
            console.log('Project detected as active from badge');
        }
    }
    
    // Mock project data - in real app this would come from server
    const projectStatus = {
        id: 'project-1',
        name: 'Website E-commerce',
        status: detectedStatus, // Use detected status
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        currentDate: new Date().toISOString().split('T')[0], // Today's date
        progress: detectedProgress // Use detected progress
    };
    
    console.log('Project status:', projectStatus);
    
    // Update evaluation tab based on project status
    updateEvaluationTab(projectStatus);
    
    // Update project progress display
    updateProjectProgress(projectStatus);
    
    console.log('Project status management initialized successfully');
}

function updateEvaluationTab(projectStatus) {
    console.log('Updating evaluation tab with project status:', projectStatus);
    
    const evaluationStatus = document.getElementById('evaluationStatus');
    const evaluationContent = document.getElementById('evaluationContent');
    const submitEvaluationBtn = document.getElementById('submitEvaluationBtn');
    
    if (!evaluationStatus) {
        console.warn('Evaluation status element not found');
        return;
    }
    
    // Check if project has "Đã hoàn tất" badge or status is completed
    const projectBadge = document.querySelector('.project-status-badge, [class*="badge"]');
    const isCompletedByBadge = projectBadge && (
        projectBadge.textContent.includes('Đã hoàn tất') || 
        projectBadge.textContent.includes('Completed') ||
        projectBadge.textContent.includes('hoàn thành')
    );
    
    // If project has completed badge, override the status
    if (isCompletedByBadge && projectStatus.status !== 'completed') {
        console.log('Project has completed badge, overriding status to completed');
        projectStatus.status = 'completed';
    }
    
    if (projectStatus.status === 'completed') {
        // Project is completed - show evaluation form
        evaluationStatus.innerHTML = `
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center">
                    <i class="fas fa-check-circle text-green-500 mr-3"></i>
                    <div>
                        <h4 class="font-medium text-green-900">Dự án đã hoàn thành</h4>
                        <p class="text-sm text-green-700">Bạn có thể tiến hành đánh giá thành viên</p>
                    </div>
                </div>
            </div>
        `;
        
        if (evaluationContent) {
            evaluationContent.classList.remove('hidden');
        }
        
        if (submitEvaluationBtn) {
            submitEvaluationBtn.disabled = false;
            submitEvaluationBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        
        // Auto-switch to evaluation tab if project is completed
        switchToEvaluationTab();
        
        console.log('Evaluation tab set to completed state - auto-switched to evaluation tab');
        
    } else if (projectStatus.status === 'active') {
        // Check if current date is past end date
        const currentDate = new Date(projectStatus.currentDate);
        const endDate = new Date(projectStatus.endDate);
        
        if (currentDate > endDate) {
            // Past end date but still active - suggest completion
            evaluationStatus.innerHTML = `
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <i class="fas fa-clock text-yellow-500 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-yellow-900">Dự án đã quá hạn</h4>
                            <p class="text-sm text-yellow-700">Dự án đã quá hạn. Nếu đã hoàn thành, vui lòng đánh dấu dự án là "Đã hoàn tất" để có thể đánh giá.</p>
                            <button onclick="markProjectCompleted()" class="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                                <i class="fas fa-check mr-2"></i>
                                Đánh dấu hoàn thành
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Project is still active and within timeline
            const daysLeft = Math.ceil((endDate - currentDate) / (1000 * 60 * 60 * 24));
            
            evaluationStatus.innerHTML = `
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <i class="fas fa-info-circle text-blue-500 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-blue-900">Dự án đang hoạt động</h4>
                            <p class="text-sm text-blue-700">Chưa đến thời điểm đánh giá. Còn ${daysLeft} ngày để hoàn thành dự án.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        if (evaluationContent) {
            evaluationContent.classList.add('hidden');
        }
        
        if (submitEvaluationBtn) {
            submitEvaluationBtn.disabled = true;
            submitEvaluationBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        
        console.log('Evaluation tab set to active state');
        
    } else if (projectStatus.status === 'cancelled') {
        // Project is cancelled
        evaluationStatus.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex items-center">
                    <i class="fas fa-times-circle text-red-500 mr-3"></i>
                    <div>
                        <h4 class="font-medium text-red-900">Dự án đã bị hủy</h4>
                        <p class="text-sm text-red-700">Không thể đánh giá dự án đã bị hủy</p>
                    </div>
                </div>
            </div>
        `;
        
        if (evaluationContent) {
            evaluationContent.classList.add('hidden');
        }
        
        if (submitEvaluationBtn) {
            submitEvaluationBtn.disabled = true;
            submitEvaluationBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        
        console.log('Evaluation tab set to cancelled state');
    }
}

function updateProjectProgress(projectStatus) {
    console.log('Updating project progress:', projectStatus.progress + '%');
    
    // Update progress bar if exists
    const progressBar = document.querySelector('.project-progress-bar');
    const progressText = document.querySelector('.project-progress-text');
    
    if (progressBar) {
        progressBar.style.width = projectStatus.progress + '%';
    }
    
    if (progressText) {
        progressText.textContent = projectStatus.progress + '%';
    }
    
    // Update project status badge
    const statusBadge = document.querySelector('.project-status-badge');
    if (statusBadge) {
        let statusText = '';
        let statusColor = '';
        
        switch (projectStatus.status) {
            case 'active':
                statusText = 'Đang hoạt động';
                statusColor = 'bg-blue-100 text-blue-800';
                break;
            case 'completed':
                statusText = 'Đã hoàn thành';
                statusColor = 'bg-green-100 text-green-800';
                break;
            case 'cancelled':
                statusText = 'Đã hủy';
                statusColor = 'bg-red-100 text-red-800';
                break;
        }
        
        statusBadge.className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`;
        statusBadge.textContent = statusText;
    }
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

// Function to switch to evaluation tab
function switchToEvaluationTab() {
    console.log('Switching to evaluation tab...');
    
    // Find evaluation tab button
    const evaluationTabBtn = document.querySelector('[data-tab="evaluation"]');
    const evaluationContent = document.getElementById('evaluation');
    
    if (evaluationTabBtn && evaluationContent) {
        // Remove active class from all tab buttons
        const allTabBtns = document.querySelectorAll('.project-tab, .tab-btn');
        allTabBtns.forEach(btn => {
            btn.classList.remove('active', 'border-vlu-red', 'text-vlu-red');
            btn.classList.add('border-transparent', 'text-gray-500');
        });
        
        // Add active class to evaluation tab button
        evaluationTabBtn.classList.add('active', 'border-vlu-red', 'text-vlu-red');
        evaluationTabBtn.classList.remove('border-transparent', 'text-gray-500');
        
        // Hide all tab contents
        const allTabContents = document.querySelectorAll('.tab-content');
        allTabContents.forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('active');
        });
        
        // Show evaluation tab content
        evaluationContent.classList.remove('hidden');
        evaluationContent.classList.add('active');
        
        console.log('Successfully switched to evaluation tab');
        
        // Show notification
        if (typeof showNotification === 'function') {
            showNotification('Chuyển tab thành công', 'Đã chuyển đến tab đánh giá vì dự án đã hoàn thành');
        }
    } else {
        console.warn('Evaluation tab button or content not found');
    }
}

// Function to manually open evaluation tab (for testing)
function openEvaluationTab() {
    console.log('Manually opening evaluation tab...');
    switchToEvaluationTab();
} 

// Function to mark project as completed
function markProjectCompleted() {
    console.log('Marking project as completed...');
    
    // Update project status
    const projectStatus = {
        id: 'project-1',
        name: 'Website E-commerce',
        status: 'completed',
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        currentDate: new Date().toISOString().split('T')[0],
        progress: 100
    };
    
    // Update evaluation tab
    updateEvaluationTab(projectStatus);
    
    // Update project progress
    updateProjectProgress(projectStatus);
    
    // Show success notification
    if (typeof showNotification === 'function') {
        showNotification('Thành công', 'Dự án đã được đánh dấu hoàn thành!');
    } else {
        alert('Dự án đã được đánh dấu hoàn thành!');
    }
    
    console.log('Project marked as completed successfully');
} 

// Leave Group Management
function initLeaveGroup() {
    console.log('Initializing leave group functionality...');
    
    const leaveGroupToolbarBtns = document.querySelectorAll('.leave-group-toolbar-btn');
    const leaveGroupModal = document.getElementById('leaveGroupModal');
    const closeLeaveGroupModal = document.getElementById('closeLeaveGroupModal');
    const cancelLeaveGroup = document.getElementById('cancelLeaveGroup');
    const confirmLeaveGroup = document.getElementById('confirmLeaveGroup');
    
    if (!leaveGroupModal) {
        console.warn('Leave group modal not found');
        return;
    }
    
    // Function to handle leave group button click
    function handleLeaveGroupClick(btn) {
        const memberName = btn.getAttribute('data-member');
        const memberRole = btn.getAttribute('data-role');
        
        console.log('Leave group button clicked for:', memberName, 'with role:', memberRole);
        
        // Populate modal with member info
        const memberNameElement = document.getElementById('leaveGroupMemberName');
        const memberRoleElement = document.getElementById('leaveGroupMemberRole');
        
        if (memberNameElement) {
            memberNameElement.textContent = memberName;
        }
        
        if (memberRoleElement) {
            memberRoleElement.textContent = `Vai trò: ${memberRole}`;
        }
        
        // Show/hide leader transfer section based on role
        const leaderTransferSection = document.getElementById('leaderTransferSection');
        const newLeaderSelect = document.getElementById('newLeaderSelect');
        
        if (leaderTransferSection && newLeaderSelect) {
            if (memberRole === 'Leader') {
                // Show leader transfer section for Leader
                leaderTransferSection.classList.remove('hidden');
                
                // Populate dropdown with available members
                populateLeaderTransferDropdown();
                
                // Disable confirm button until a new leader is selected
                const confirmBtn = document.getElementById('confirmLeaveGroup');
                if (confirmBtn) {
                    confirmBtn.disabled = true;
                    confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
                
                // Add event listener to enable confirm button when selection is made
                newLeaderSelect.addEventListener('change', function() {
                    if (confirmBtn) {
                        if (this.value) {
                            confirmBtn.disabled = false;
                            confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        } else {
                            confirmBtn.disabled = true;
                            confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
                        }
                    }
                });
                
            } else {
                // Hide leader transfer section for non-Leader
                leaderTransferSection.classList.add('hidden');
                
                // Enable confirm button for non-Leader
                const confirmBtn = document.getElementById('confirmLeaveGroup');
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            }
        }
        
        // Store member info for confirmation
        leaveGroupModal.setAttribute('data-member', memberName);
        leaveGroupModal.setAttribute('data-role', memberRole);
        
        // Show modal
        leaveGroupModal.classList.remove('hidden');
        console.log('Leave group modal shown');
    }
    
    // Function to populate leader transfer dropdown
    function populateLeaderTransferDropdown() {
        const newLeaderSelect = document.getElementById('newLeaderSelect');
        if (!newLeaderSelect) return;
        
        // Clear existing options except the first one
        newLeaderSelect.innerHTML = '<option value="">-- Chọn thành viên --</option>';
        
        // Get all member elements from the page
        const memberElements = document.querySelectorAll('.flex.items-center.justify-between.p-4.border.border-gray-200.rounded-lg');
        
        memberElements.forEach(element => {
            const nameElement = element.querySelector('h4');
            const roleElement = element.querySelector('span');
            
            if (nameElement && roleElement) {
                const memberName = nameElement.textContent;
                const roleText = roleElement.textContent.trim();
                
                // Only add non-Leader members
                if (!roleText.includes('Leader')) {
                    const option = document.createElement('option');
                    option.value = memberName;
                    option.textContent = `${memberName} (${roleText})`;
                    newLeaderSelect.appendChild(option);
                }
            }
        });
        
        console.log('Leader transfer dropdown populated');
    }
    
    // Open leave group modal when clicking leave group button (in toolbar only)
    leaveGroupToolbarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLeaveGroupClick(btn);
        });
    });
    
    // Close modal handlers
    if (closeLeaveGroupModal) {
        closeLeaveGroupModal.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close leave group modal clicked');
            leaveGroupModal.classList.add('hidden');
        });
    }
    
    if (cancelLeaveGroup) {
        cancelLeaveGroup.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Cancel leave group clicked');
            leaveGroupModal.classList.add('hidden');
        });
    }
    
    // Close modal when clicking outside
    leaveGroupModal.addEventListener('click', (e) => {
        if (e.target === leaveGroupModal) {
            console.log('Leave group modal closed by outside click');
            leaveGroupModal.classList.add('hidden');
        }
    });
    
    // Confirm leave group
    if (confirmLeaveGroup) {
        confirmLeaveGroup.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const memberName = leaveGroupModal.getAttribute('data-member');
            const memberRole = leaveGroupModal.getAttribute('data-role');
            
            console.log('Confirm leave group for:', memberName, 'with role:', memberRole);
            
            // Process leave group
            processLeaveGroup(memberName, memberRole);
            
            // Close modal
            leaveGroupModal.classList.add('hidden');
        });
    }
    
    console.log('Leave group functionality initialized successfully');
}

function processLeaveGroup(memberName, memberRole) {
    console.log('Processing leave group for:', memberName, 'with role:', memberRole);
    
    // Check if member is leader
    if (memberRole === 'Leader') {
        // Get the selected new leader
        const newLeaderSelect = document.getElementById('newLeaderSelect');
        const selectedNewLeader = newLeaderSelect ? newLeaderSelect.value : '';
        
        if (!selectedNewLeader) {
            // Show error if no new leader is selected
            if (typeof showNotification === 'function') {
                showNotification('Lỗi', 'Vui lòng chọn thành viên để nhượng quyền Leader trước khi rời nhóm.');
            } else {
                alert('Vui lòng chọn thành viên để nhượng quyền Leader trước khi rời nhóm.');
            }
            return;
        }
        
        // Process leader transfer
        console.log('Transferring leadership to:', selectedNewLeader);
        
        // Update UI to show new leader
        updateLeaderInUI(selectedNewLeader);
        
        // Show success notification for leader transfer
        if (typeof showNotification === 'function') {
            showNotification('Thành công', `Đã nhượng quyền Leader cho ${selectedNewLeader}. Bạn đã rời nhóm thành công!`);
        } else {
            alert(`Đã nhượng quyền Leader cho ${selectedNewLeader}. Bạn đã rời nhóm thành công!`);
        }
        
        // Redirect to main page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        
        return;
    }
    
    // This is a non-Leader member leaving, redirect to main page
    console.log('Non-Leader member is leaving group, redirecting...');
    
    // Show success notification
    if (typeof showNotification === 'function') {
        showNotification('Thành công', 'Bạn đã rời nhóm thành công!');
    } else {
        alert('Bạn đã rời nhóm thành công!');
    }
    
    // Redirect to main page after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
    
    // Here you would typically send the leave group request to the server
    console.log('Leave group request would be sent to server for:', memberName);
}

// Function to update leader in UI
function updateLeaderInUI(newLeaderName) {
    console.log('Updating leader in UI to:', newLeaderName);
    
    // Find the member element and update their role
    const memberElements = document.querySelectorAll('.flex.items-center.justify-between.p-4.border.border-gray-200.rounded-lg');
    
    memberElements.forEach(element => {
        const nameElement = element.querySelector('h4');
        const roleElement = element.querySelector('span');
        
        if (nameElement && roleElement) {
            const memberName = nameElement.textContent;
            
            if (memberName === newLeaderName) {
                // Update this member to Leader
                roleElement.innerHTML = 'Leader';
                roleElement.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
                console.log('Updated member to Leader:', memberName);
            } else if (roleElement.textContent.includes('Leader')) {
                // Update previous leader to Member
                roleElement.innerHTML = 'Member';
                roleElement.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800';
                console.log('Updated previous leader to Member:', memberName);
            }
        }
    });
    
    // Update toolbar button data if it exists
    const toolbarBtn = document.querySelector('.leave-group-toolbar-btn');
    if (toolbarBtn) {
        toolbarBtn.setAttribute('data-member', newLeaderName);
        console.log('Updated toolbar button data to new leader:', newLeaderName);
    }
}

function updateMemberCount() {
    console.log('Updating member count...');
    
    const memberElements = document.querySelectorAll('.flex.items-center.justify-between.p-4.border.border-gray-200.rounded-lg');
    const memberCount = memberElements.length;
    
    // Update member count display if exists
    const memberCountElement = document.querySelector('.member-count');
    if (memberCountElement) {
        memberCountElement.textContent = memberCount;
    }
    
    console.log('Member count updated:', memberCount);
} 