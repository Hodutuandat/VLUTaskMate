// VLUTaskMate - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
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
});

// Modal Management
function initModals() {
    // Create Project Modal
    const createProjectBtn = document.getElementById('createProjectBtn');
    const createProjectModal = document.getElementById('createProjectModal');
    const closeCreateModal = document.getElementById('closeCreateModal');
    const cancelCreateProject = document.getElementById('cancelCreateProject');

    if (createProjectBtn) {
        createProjectBtn.addEventListener('click', () => {
            createProjectModal.classList.remove('hidden');
        });
    }

    if (closeCreateModal) {
        closeCreateModal.addEventListener('click', () => {
            createProjectModal.classList.add('hidden');
        });
    }

    if (cancelCreateProject) {
        cancelCreateProject.addEventListener('click', () => {
            createProjectModal.classList.add('hidden');
        });
    }

    // Invite Member Modal
    const inviteMemberBtn = document.getElementById('inviteMemberBtn');
    const inviteMemberModal = document.getElementById('inviteMemberModal');
    const closeInviteModal = document.getElementById('closeInviteModal');
    const cancelInvite = document.getElementById('cancelInvite');

    if (inviteMemberBtn) {
        inviteMemberBtn.addEventListener('click', () => {
            inviteMemberModal.classList.remove('hidden');
        });
    }

    if (closeInviteModal) {
        closeInviteModal.addEventListener('click', () => {
            inviteMemberModal.classList.add('hidden');
        });
    }

    if (cancelInvite) {
        cancelInvite.addEventListener('click', () => {
            inviteMemberModal.classList.add('hidden');
        });
    }

    // Create Task Modal
    const createTaskBtn = document.getElementById('createTaskBtn');
    const createTaskModal = document.getElementById('createTaskModal');
    const closeTaskModal = document.getElementById('closeTaskModal');
    const cancelTask = document.getElementById('cancelTask');

    if (createTaskBtn) {
        createTaskBtn.addEventListener('click', () => {
            createTaskModal.classList.remove('hidden');
        });
    }

    if (closeTaskModal) {
        closeTaskModal.addEventListener('click', () => {
            createTaskModal.classList.add('hidden');
        });
    }

    if (cancelTask) {
        cancelTask.addEventListener('click', () => {
            createTaskModal.classList.add('hidden');
        });
    }

    // Add Subtask Modal
    const addSubtaskBtn = document.getElementById('addSubtaskBtn');
    const addSubtaskModal = document.getElementById('addSubtaskModal');
    const closeSubtaskModal = document.getElementById('closeSubtaskModal');
    const cancelSubtask = document.getElementById('cancelSubtask');

    if (addSubtaskBtn) {
        addSubtaskBtn.addEventListener('click', () => {
            addSubtaskModal.classList.remove('hidden');
        });
    }

    if (closeSubtaskModal) {
        closeSubtaskModal.addEventListener('click', () => {
            addSubtaskModal.classList.add('hidden');
        });
    }

    if (cancelSubtask) {
        cancelSubtask.addEventListener('click', () => {
            addSubtaskModal.classList.add('hidden');
        });
    }

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        const modals = document.querySelectorAll('[id$="Modal"]');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
}

// Tab Management
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectContents = document.querySelectorAll('.project-content');

    // Check project status for evaluation tab
    function checkProjectStatus() {
        const evaluationTab = document.querySelector('[data-tab="evaluation"]');
        const evaluationStatus = document.getElementById('evaluationStatus');
        const evaluationContent = document.getElementById('evaluationContent');
        
        if (evaluationTab && evaluationStatus && evaluationContent) {
            // Simulate project status check (you can modify this logic)
            const projectStatus = getProjectStatus(); // This will be determined by your logic
            
            if (projectStatus === 'completed') {
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
                evaluationContent.style.display = 'block';
            } else {
                // Project is not completed - show waiting message
                evaluationStatus.innerHTML = `
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div class="flex items-center">
                            <i class="fas fa-clock text-yellow-500 mr-3"></i>
                            <div>
                                <h4 class="font-medium text-yellow-900">Chưa đến thời điểm</h4>
                                <p class="text-sm text-yellow-700">Đánh giá chỉ có thể thực hiện khi dự án đã hoàn thành</p>
                            </div>
                        </div>
                    </div>
                `;
                evaluationContent.style.display = 'none';
            }
        }
    }

    // Function to get project status (modify this based on your logic)
    function getProjectStatus() {
        // You can implement your own logic here
        // For now, let's simulate based on URL or other criteria
        const urlParams = new URLSearchParams(window.location.search);
        const projectStatus = urlParams.get('status') || 'active'; // Default to active
        
        // You can also check based on task completion, dates, etc.
        // For demonstration, we'll use a simple logic
        const currentDate = new Date();
        const projectEndDate = new Date('2024-12-15'); // Set your project end date
        
        if (currentDate >= projectEndDate) {
            return 'completed';
        } else {
            return 'active';
        }
    }

    // Project tabs (Dashboard)
    projectTabs.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all project tab buttons and contents
            projectTabs.forEach(btn => {
                btn.classList.remove('active', 'border-vlu-red', 'text-vlu-red');
                btn.classList.add('text-gray-500', 'border-transparent');
            });
            
            projectContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and target content
            button.classList.add('active', 'border-vlu-red', 'text-vlu-red');
            button.classList.remove('text-gray-500', 'border-transparent');
            
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
            }
        });
    });

    // Set default active tab for member projects
    const memberProjectsTab = document.querySelector('[data-tab="member-projects"]');
    const memberProjectsContent = document.getElementById('member-projects');
    const leaderProjectsTab = document.querySelector('[data-tab="leader-projects"]');
    const leaderProjectsContent = document.getElementById('leader-projects');
    
    if (memberProjectsTab && memberProjectsContent) {
        // Set member projects as default active
        memberProjectsTab.classList.add('active', 'border-vlu-red', 'text-vlu-red');
        memberProjectsTab.classList.remove('text-gray-500', 'border-transparent');
        
        // Ensure member projects content is visible
        memberProjectsContent.classList.remove('hidden');
        memberProjectsContent.classList.add('active');
        
        // Hide leader projects by default
        if (leaderProjectsContent) {
            leaderProjectsContent.classList.add('hidden');
            leaderProjectsContent.classList.remove('active');
        }
        
        // Set leader tab as inactive
        if (leaderProjectsTab) {
            leaderProjectsTab.classList.remove('active', 'border-vlu-red', 'text-vlu-red');
            leaderProjectsTab.classList.add('text-gray-500', 'border-transparent');
        }
        
        // Force display member projects
        memberProjectsContent.style.display = 'block';
        memberProjectsContent.style.visibility = 'visible';
        memberProjectsContent.style.opacity = '1';
        
        // Debug: Log to console
        console.log('Member projects tab found:', memberProjectsTab);
        console.log('Member projects content found:', memberProjectsContent);
        console.log('Member projects content classes:', memberProjectsContent.className);
        console.log('Member projects content style:', memberProjectsContent.style.display);
        
        // Check if content is actually visible
        setTimeout(() => {
            const memberContent = document.getElementById('member-projects');
            const leaderContent = document.getElementById('leader-projects');
            console.log('Member content display:', memberContent?.style.display);
            console.log('Leader content display:', leaderContent?.style.display);
            console.log('Member content hidden class:', memberContent?.classList.contains('hidden'));
            console.log('Leader content hidden class:', leaderContent?.classList.contains('hidden'));
        }, 100);
    } else {
        console.error('Member projects elements not found!');
    }

    // Regular tabs (Project detail pages)
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-vlu-red', 'text-vlu-red');
                btn.classList.add('text-gray-500', 'border-transparent');
            });
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and target content
            button.classList.add('active', 'border-vlu-red', 'text-vlu-red');
            button.classList.remove('text-gray-500', 'border-transparent');
            
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
            }
        });
    });
}

// User Menu Management
function initUserMenu() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');

    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', () => {
            userMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.add('hidden');
            }
        });
    }
}

// User menu dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenuDropdown = document.getElementById('userMenuDropdown');

    if (userMenuBtn && userMenuDropdown) {
        // Toggle dropdown
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenuDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
                userMenuDropdown.classList.add('hidden');
            }
        });
    }
});

// Notifications Management
function initNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            // Show notifications dropdown or modal
            showNotification('Thông báo', 'Bạn có 3 thông báo mới');
        });
    }
}

// Drag and Drop for Kanban (Trello-style)
function initDragDrop() {
    let draggedElement = null;
    let draggedElementClone = null;
    let originalPosition = null;
    let dropZone = null;

    // Initialize draggable task cards
    function initDraggableCards() {
        const taskCards = document.querySelectorAll('.task-card');
        
        taskCards.forEach(card => {
            card.setAttribute('draggable', 'true');
            
            // Drag start
            card.addEventListener('dragstart', (e) => {
                draggedElement = card;
                originalPosition = {
                    parent: card.parentElement,
                    nextSibling: card.nextSibling
                };
                
                // Create clone for visual feedback
                draggedElementClone = card.cloneNode(true);
                draggedElementClone.style.opacity = '0.5';
                draggedElementClone.style.transform = 'rotate(5deg)';
                draggedElementClone.style.position = 'fixed';
                draggedElementClone.style.pointerEvents = 'none';
                draggedElementClone.style.zIndex = '1000';
                document.body.appendChild(draggedElementClone);
                
                // Set drag data
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', card.outerHTML);
                
                // Add visual feedback
                card.style.opacity = '0.3';
                card.style.transform = 'rotate(5deg)';
                
                // Add dragging class
                card.classList.add('dragging');
            });
            
            // Drag end
            card.addEventListener('dragend', (e) => {
                if (draggedElement) {
                    draggedElement.style.opacity = '';
                    draggedElement.style.transform = '';
                    draggedElement.classList.remove('dragging');
                }
                
                if (draggedElementClone) {
                    document.body.removeChild(draggedElementClone);
                    draggedElementClone = null;
                }
                
                // Remove drop zone highlights
                document.querySelectorAll('.drop-zone-active').forEach(zone => {
                    zone.classList.remove('drop-zone-active');
                });
                
                draggedElement = null;
                originalPosition = null;
                dropZone = null;
            });
        });
    }

    // Initialize drop zones
    function initDropZones() {
        const dropZones = document.querySelectorAll('.space-y-3');
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                
                // Add visual feedback
                zone.classList.add('drop-zone-active');
                dropZone = zone;
                
                // Show drop indicator
                showDropIndicator(zone, e);
            });
            
            zone.addEventListener('dragleave', (e) => {
                // Only remove highlight if leaving the zone completely
                if (!zone.contains(e.relatedTarget)) {
                    zone.classList.remove('drop-zone-active');
                    hideDropIndicator(zone);
                }
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                
                if (draggedElement && dropZone) {
                    // Remove visual feedback
                    dropZone.classList.remove('drop-zone-active');
                    hideDropIndicator(dropZone);
                    
                    // Get drop position
                    const dropPosition = getDropPosition(dropZone, e);
                    
                    // Move the card
                    moveCard(draggedElement, dropZone, dropPosition);
                    
                    // Update activity log
                    updateTaskStatus(draggedElement, dropZone);
                }
            });
        });
    }

    // Show drop indicator
    function showDropIndicator(zone, e) {
        let indicator = zone.querySelector('.drop-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'drop-indicator h-1 bg-vlu-red rounded-full my-2 transition-all duration-200';
            zone.appendChild(indicator);
        }
        
        // Position indicator based on mouse position
        const cards = zone.querySelectorAll('.task-card:not(.dragging)');
        const mouseY = e.clientY;
        let insertIndex = cards.length;
        
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (mouseY < rect.top + rect.height / 2) {
                insertIndex = index;
                return;
            }
        });
        
        // Position indicator
        if (insertIndex === 0) {
            indicator.style.order = '-1';
        } else if (insertIndex === cards.length) {
            indicator.style.order = cards.length.toString();
        } else {
            indicator.style.order = insertIndex.toString();
        }
        
        indicator.style.opacity = '1';
    }

    // Hide drop indicator
    function hideDropIndicator(zone) {
        const indicator = zone.querySelector('.drop-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 200);
        }
    }

    // Get drop position
    function getDropPosition(zone, e) {
        const cards = zone.querySelectorAll('.task-card:not(.dragging)');
        const mouseY = e.clientY;
        let insertIndex = cards.length;
        
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (mouseY < rect.top + rect.height / 2) {
                insertIndex = index;
                return;
            }
        });
        
        return insertIndex;
    }

    // Move card to new position
    function moveCard(card, targetZone, position) {
        const cards = targetZone.querySelectorAll('.task-card:not(.dragging)');
        
        if (position === 0) {
            targetZone.insertBefore(card, targetZone.firstChild);
        } else if (position >= cards.length) {
            targetZone.appendChild(card);
        } else {
            targetZone.insertBefore(card, cards[position]);
        }
        
        // Add animation
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);
    }

    // Update task status and activity log
    function updateTaskStatus(card, newZone) {
        const taskTitle = card.querySelector('h5').textContent;
        const columnMap = {
            'todo': 'To Do',
            'inprogress': 'In Progress', 
            'review': 'Review',
            'done': 'Done'
        };
        
        // Find which column the card was moved to
        const columnId = newZone.closest('.flex-shrink-0').querySelector('[data-column]')?.getAttribute('data-column');
        const columnName = columnMap[columnId] || 'Unknown';
        
        // Add to activity log
        addActivityLog(`Đã chuyển task "${taskTitle}" sang ${columnName}`);
        
        // Update task count if needed
        updateTaskCount(newZone);
    }

    // Update task count
    function updateTaskCount(zone) {
        const column = zone.closest('.flex-shrink-0');
        const title = column.querySelector('h4');
        const taskCount = zone.querySelectorAll('.task-card').length;
        
        // Update title with count
        const currentText = title.textContent;
        const newText = currentText.replace(/\(\d+\)/, `(${taskCount})`);
        title.textContent = newText;
    }

    // Initialize drag and drop
    initDraggableCards();
    initDropZones();
}

// Initialize drag and drop for a single card
function initDragDropForCard(card) {
    card.setAttribute('draggable', 'true');
    
    // Drag start
    card.addEventListener('dragstart', (e) => {
        draggedElement = card;
        originalPosition = {
            parent: card.parentElement,
            nextSibling: card.nextSibling
        };
        
        // Create clone for visual feedback
        draggedElementClone = card.cloneNode(true);
        draggedElementClone.style.opacity = '0.5';
        draggedElementClone.style.transform = 'rotate(5deg)';
        draggedElementClone.style.position = 'fixed';
        draggedElementClone.style.pointerEvents = 'none';
        draggedElementClone.style.zIndex = '1000';
        document.body.appendChild(draggedElementClone);
        
        // Set drag data
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', card.outerHTML);
        
        // Add visual feedback
        card.style.opacity = '0.3';
        card.style.transform = 'rotate(5deg)';
        
        // Add dragging class
        card.classList.add('dragging');
    });
    
    // Drag end
    card.addEventListener('dragend', (e) => {
        if (draggedElement) {
            draggedElement.style.opacity = '';
            draggedElement.style.transform = '';
            draggedElement.classList.remove('dragging');
        }
        
        if (draggedElementClone) {
            document.body.removeChild(draggedElementClone);
            draggedElementClone = null;
        }
        
        // Remove drop zone highlights
        document.querySelectorAll('.drop-zone-active').forEach(zone => {
            zone.classList.remove('drop-zone-active');
        });
        
        draggedElement = null;
        originalPosition = null;
        dropZone = null;
    });
}

// Update task count in Kanban columns
function updateTaskCount(column) {
    const title = column.previousElementSibling;
    const taskCount = column.children.length;
    const currentText = title.textContent;
    const newText = currentText.replace(/\(\d+\)/, `(${taskCount})`);
    title.textContent = newText;
}

// Comments Management
function initComments() {
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');

    if (commentInput && submitComment) {
        submitComment.addEventListener('click', () => {
            const comment = commentInput.value.trim();
            if (comment) {
                addComment(comment);
                commentInput.value = '';
            }
        });

        // Submit on Enter key
        commentInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitComment.click();
            }
        });
    }
}

// Add new comment to the list
function addComment(text) {
    const commentsContainer = document.querySelector('.space-y-4');
    if (!commentsContainer) return;

    const newComment = document.createElement('div');
    newComment.className = 'flex space-x-3';
    newComment.innerHTML = `
        <img class="h-8 w-8 rounded-full bg-gray-300" src="https://via.placeholder.com/32" alt="User">
        <div class="flex-1">
            <div class="flex items-center space-x-2 mb-1">
                <span class="font-medium text-gray-900">Hồ Du Tuấn Đạt</span>
                <span class="text-xs text-gray-500">Vừa xong</span>
            </div>
            <p class="text-gray-700 mb-2">${text}</p>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
                <button class="hover:text-vlu-red">Trả lời</button>
                <button class="hover:text-vlu-red">Chỉnh sửa</button>
                <button class="hover:text-red-600">Xóa</button>
            </div>
        </div>
    `;

    commentsContainer.appendChild(newComment);
}

// Subtask Checkbox Management
function initSubtaskCheckboxes() {
    const subtaskCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    
    subtaskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const subtaskText = checkbox.nextElementSibling;
            const statusSpan = checkbox.parentElement.querySelector('span:last-child');
            
            if (checkbox.checked) {
                subtaskText.classList.add('line-through');
                statusSpan.textContent = 'Hoàn thành';
                statusSpan.className = 'text-xs text-green-500';
            } else {
                subtaskText.classList.remove('line-through');
                statusSpan.textContent = 'Chưa hoàn thành';
                statusSpan.className = 'text-xs text-gray-500';
            }
        });
    });
}

// Utility Functions
function showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm';
    notification.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                <i class="fas fa-bell text-vlu-red"></i>
            </div>
            <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900">${title}</p>
                <p class="text-sm text-gray-500">${message}</p>
            </div>
            <div class="ml-4 flex-shrink-0">
                <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Form submission handlers
function handleFormSubmission(formId, successMessage) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send data to server
            showNotification('Thành công', successMessage);
            
            // Close modal
            const modal = form.closest('[id$="Modal"]');
            if (modal) {
                modal.classList.add('hidden');
            }
            
            // Reset form
            form.reset();
            
            // Clear invited members list
            const invitedMembersList = document.getElementById('invitedMembersList');
            if (invitedMembersList) {
                invitedMembersList.innerHTML = '';
            }
        });
    }
}

// Initialize form handlers
document.addEventListener('DOMContentLoaded', function() {
    handleFormSubmission('createProjectForm', 'Dự án đã được tạo thành công!');
    handleFormSubmission('inviteMemberForm', 'Lời mời đã được gửi!');
    handleFormSubmission('createTaskForm', 'Task đã được tạo thành công!');
    handleFormSubmission('addSubtaskForm', 'Subtask đã được thêm!');
    
    // Initialize member invitation functionality
    initMemberInvitation();
    
    // Initialize project date validation
    initProjectDateValidation();
});

// Close Project functionality
function initCloseProject() {
    const closeProjectBtn = document.getElementById('closeProjectBtn');
    
    if (closeProjectBtn) {
        closeProjectBtn.addEventListener('click', () => {
            if (confirm('Bạn có chắc chắn muốn đóng dự án này? Hành động này không thể hoàn tác.')) {
                showNotification('Thành công', 'Dự án đã được đóng thành công!');
                // Here you would typically send request to server
            }
        });
    }
}

// Initialize close project functionality
document.addEventListener('DOMContentLoaded', function() {
    initCloseProject();
    initKickMember();
});

// Member Invitation Management
function initMemberInvitation() {
    const addMemberBtn = document.getElementById('addMemberBtn');
    const memberEmailInput = document.getElementById('memberEmail');
    const invitedMembersList = document.getElementById('invitedMembersList');
    
    if (addMemberBtn && memberEmailInput && invitedMembersList) {
        addMemberBtn.addEventListener('click', () => {
            const email = memberEmailInput.value.trim();
            
            if (!email) {
                showNotification('Lỗi', 'Vui lòng nhập email thành viên');
                return;
            }
            
            if (!email.endsWith('@vlu.edu.vn')) {
                showNotification('Lỗi', 'Email phải có định dạng @vlu.edu.vn');
                return;
            }
            
            // Check if email already exists in the list
            const existingEmails = Array.from(invitedMembersList.children).map(item => 
                item.querySelector('.member-email').textContent
            );
            
            if (existingEmails.includes(email)) {
                showNotification('Lỗi', 'Email này đã được thêm vào danh sách');
                return;
            }
            
            // Add member to the list
            addMemberToList(email);
            
            // Clear input
            memberEmailInput.value = '';
            
            // Show success notification
            showNotification('Thành công', `Đã gửi lời mời đến ${email}`);
        });
        
        // Allow Enter key to add member
        memberEmailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addMemberBtn.click();
            }
        });
    }
}

// Project Date Validation
function initProjectDateValidation() {
    const startDateInput = document.querySelector('input[name="projectStartDate"]');
    const endDateInput = document.querySelector('input[name="projectEndDate"]');
    
    if (startDateInput && endDateInput) {
        // Set minimum start date to today
        const today = new Date().toISOString().split('T')[0];
        startDateInput.min = today;
        
        // Update end date minimum when start date changes
        startDateInput.addEventListener('change', () => {
            const startDate = startDateInput.value;
            if (startDate) {
                endDateInput.min = startDate;
                
                // If end date is before start date, clear it
                if (endDateInput.value && endDateInput.value < startDate) {
                    endDateInput.value = '';
                }
            }
        });
        
        // Update start date maximum when end date changes
        endDateInput.addEventListener('change', () => {
            const endDate = endDateInput.value;
            if (endDate) {
                startDateInput.max = endDate;
                
                // If start date is after end date, clear it
                if (startDateInput.value && startDateInput.value > endDate) {
                    startDateInput.value = '';
                }
            }
        });
        
        // Form validation
        const createProjectForm = document.getElementById('createProjectForm');
        if (createProjectForm) {
            createProjectForm.addEventListener('submit', (e) => {
                const startDate = startDateInput.value;
                const endDate = endDateInput.value;
                
                if (!startDate || !endDate) {
                    e.preventDefault();
                    showNotification('Lỗi', 'Vui lòng nhập đầy đủ ngày bắt đầu và kết thúc');
                    return;
                }
                
                if (startDate >= endDate) {
                    e.preventDefault();
                    showNotification('Lỗi', 'Ngày kết thúc phải sau ngày bắt đầu');
                    return;
                }
                
                // Calculate project duration
                const start = new Date(startDate);
                const end = new Date(endDate);
                const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                
                if (duration > 365) {
                    e.preventDefault();
                    showNotification('Lỗi', 'Dự án không được kéo dài quá 1 năm');
                    return;
                }
                
                // Show success with duration info
                showNotification('Thành công', `Dự án sẽ kéo dài ${duration} ngày`);
            });
        }
    }
}

function addMemberToList(email) {
    const invitedMembersList = document.getElementById('invitedMembersList');
    
    const memberItem = document.createElement('div');
    memberItem.className = 'flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200';
    memberItem.innerHTML = `
        <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <i class="fas fa-user text-gray-600 text-sm"></i>
            </div>
            <div>
                <span class="member-email text-sm font-medium text-gray-900">${email}</span>
                <div class="flex items-center space-x-2 mt-1">
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <i class="fas fa-clock mr-1"></i>
                        Pending
                    </span>
                </div>
            </div>
        </div>
        <button type="button" class="remove-member-btn text-red-500 hover:text-red-700 transition-colors">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add remove functionality
    const removeBtn = memberItem.querySelector('.remove-member-btn');
    removeBtn.addEventListener('click', () => {
        memberItem.remove();
        showNotification('Thông báo', 'Đã xóa thành viên khỏi danh sách');
    });
    
    invitedMembersList.appendChild(memberItem);
}

// Kick Member Management
function initKickMember() {
    const kickButtons = document.querySelectorAll('.kick-member-btn');
    const kickModal = document.getElementById('kickMemberModal');
    const closeKickModal = document.getElementById('closeKickModal');
    const cancelKick = document.getElementById('cancelKick');
    const confirmKick = document.getElementById('confirmKick');
    const kickMemberName = document.getElementById('kickMemberName');
    const kickMemberInfo = document.getElementById('kickMemberInfo');
    
    let memberToKick = null;
    let memberElement = null;
    
    // Open kick modal
    kickButtons.forEach(button => {
        button.addEventListener('click', () => {
            const memberName = button.getAttribute('data-member');
            const memberCard = button.closest('.flex.items-center.justify-between');
            const memberInfo = memberCard.querySelector('p.text-sm.text-gray-500').textContent;
            
            // Store member info for confirmation
            memberToKick = memberName;
            memberElement = memberCard;
            
            // Update modal content
            kickMemberName.textContent = memberName;
            kickMemberInfo.textContent = memberInfo;
            
            // Show modal
            kickModal.classList.remove('hidden');
        });
    });
    
    // Close modal
    if (closeKickModal) {
        closeKickModal.addEventListener('click', () => {
            kickModal.classList.add('hidden');
        });
    }
    
    if (cancelKick) {
        cancelKick.addEventListener('click', () => {
            kickModal.classList.add('hidden');
        });
    }
    
    // Confirm kick
    if (confirmKick) {
        confirmKick.addEventListener('click', () => {
            if (memberElement) {
                // Add fade out animation
                memberElement.style.transition = 'all 0.3s ease';
                memberElement.style.opacity = '0';
                memberElement.style.transform = 'translateX(-100%)';
                
                setTimeout(() => {
                    memberElement.remove();
                    showNotification('Thành công', `Đã kick ${memberToKick} khỏi nhóm`);
                    
                    // Update member count
                    updateMemberCount();
                }, 300);
            }
            
            kickModal.classList.add('hidden');
        });
    }
    
    // Close modal when clicking outside
    if (kickModal) {
        kickModal.addEventListener('click', (event) => {
            if (event.target === kickModal) {
                kickModal.classList.add('hidden');
            }
        });
    }
}

function updateMemberCount() {
    const memberCards = document.querySelectorAll('.flex.items-center.justify-between');
    const memberCount = memberCards.length;
    
    // Update any member count displays
    const countElements = document.querySelectorAll('.text-sm.text-gray-500');
    countElements.forEach(element => {
        if (element.textContent.includes('thành viên')) {
            element.textContent = `${memberCount} thành viên`;
        }
    });
}

// Initialize add card functionality
function initAddCard() {
    const addCardButtons = document.querySelectorAll('.add-card-btn');
    const addCardModal = document.getElementById('addCardModal');
    const closeAddCardModal = document.getElementById('closeAddCardModal');
    const cancelAddCard = document.getElementById('cancelAddCard');
    const addCardForm = document.getElementById('addCardForm');
    const newTaskTitle = document.getElementById('newTaskTitle');
    const newTaskDescription = document.getElementById('newTaskDescription');
    const newTaskType = document.getElementById('newTaskType');
    const newTaskPriority = document.getElementById('newTaskPriority');

    addCardButtons.forEach(button => {
        button.addEventListener('click', function() {
            const column = this.getAttribute('data-column');
            addCardModal.setAttribute('data-target-column', column);
            addCardModal.classList.remove('hidden');
            newTaskTitle.focus();
        });
    });

    [closeAddCardModal, cancelAddCard].forEach(button => {
        button.addEventListener('click', function() {
            addCardModal.classList.add('hidden');
            addCardForm.reset();
        });
    });

    addCardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = newTaskTitle.value.trim();
        const description = newTaskDescription.value.trim();
        const type = newTaskType.value;
        const priority = newTaskPriority.value;
        const targetColumn = addCardModal.getAttribute('data-target-column');
        
        if (title) {
            createNewTask(title, description, type, priority, targetColumn);
            addCardModal.classList.add('hidden');
            addCardForm.reset();
        }
    });
}

function createNewTask(title, description, type, priority, column) {
    const taskId = Date.now(); // Simple ID generation
    const taskCard = document.createElement('div');
    taskCard.className = 'bg-gray-50 rounded-lg p-3 cursor-pointer task-card hover:bg-gray-100 transition-colors';
    taskCard.setAttribute('data-task-id', taskId);
    taskCard.setAttribute('data-task-title', title);
    taskCard.setAttribute('data-task-description', description || '');
    taskCard.setAttribute('data-task-type', type);
    taskCard.setAttribute('data-task-priority', priority);

    const typeColors = {
        'Feature': 'bg-blue-100 text-blue-800',
        'Backend': 'bg-green-100 text-green-800',
        'Frontend': 'bg-yellow-100 text-yellow-800',
        'Docs': 'bg-purple-100 text-purple-800',
        'Setup': 'bg-green-100 text-green-800'
    };

    const priorityColors = {
        'High': 'bg-red-100 text-red-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'Low': 'bg-green-100 text-green-800',
        'Completed': 'bg-green-100 text-green-800'
    };

    taskCard.innerHTML = `
        <div class="flex items-start justify-between mb-2">
            <h5 class="font-medium text-gray-900 text-sm">${title}</h5>
            <button class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-ellipsis-h text-xs"></i>
            </button>
        </div>
        ${description ? `<p class="text-xs text-gray-600 mb-3">${description}</p>` : ''}
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeColors[type]}">
                    ${type}
                </span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}">
                    ${priority}
                </span>
            </div>
            <div class="flex items-center space-x-1">
                <img class="h-6 w-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center" src="https://via.placeholder.com/24" alt="User">
                <span class="text-xs text-gray-500">now</span>
            </div>
        </div>
    `;

    // Add click event to open task detail
    taskCard.addEventListener('click', function() {
        openTaskDetail(this);
    });

    // Find the target column and add the task
    const targetColumn = document.querySelector(`[data-column="${column}"]`).closest('.flex-shrink-0').querySelector('.space-y-3');
    targetColumn.appendChild(taskCard);

    // Add animation
    taskCard.style.opacity = '0';
    taskCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        taskCard.style.transition = 'all 0.3s ease';
        taskCard.style.opacity = '1';
        taskCard.style.transform = 'translateY(0)';
    }, 10);

    // Initialize drag and drop for new card
    initDragDropForCard(taskCard);
}

// Initialize task detail functionality
function initTaskDetail() {
    const taskCards = document.querySelectorAll('.task-card');
    
    taskCards.forEach(card => {
        card.addEventListener('click', function() {
            openTaskDetail(this);
        });
    });
}

function openTaskDetail(taskCard) {
    const taskDetailModal = document.getElementById('taskDetailModal');
    const taskDetailTitle = document.getElementById('taskDetailTitle');
    const taskDescription = document.getElementById('taskDescription');
    const taskStatus = document.getElementById('taskStatus');
    const descriptionTextarea = document.getElementById('descriptionTextarea');

    // Get task data
    const title = taskCard.getAttribute('data-task-title');
    const description = taskCard.getAttribute('data-task-description');
    const type = taskCard.getAttribute('data-task-type');
    const priority = taskCard.getAttribute('data-task-priority');

    // Update modal content
    taskDetailTitle.textContent = title;
    taskDescription.textContent = description || 'Chưa có mô tả';
    descriptionTextarea.value = description || '';

    // Show modal
    taskDetailModal.classList.remove('hidden');
}

// Initialize task detail modal controls
function initTaskDetailControls() {
    const taskDetailModal = document.getElementById('taskDetailModal');
    const closeTaskDetailModal = document.getElementById('closeTaskDetailModal');
    const editDescription = document.getElementById('editDescription');
    const cancelEditDescription = document.getElementById('cancelEditDescription');
    const saveDescription = document.getElementById('saveDescription');
    const descriptionContent = document.getElementById('descriptionContent');
    const descriptionEdit = document.getElementById('descriptionEdit');
    const taskDescription = document.getElementById('taskDescription');
    const descriptionTextarea = document.getElementById('descriptionTextarea');
    const addComment = document.getElementById('addComment');
    const newComment = document.getElementById('newComment');

    // Close modal
    closeTaskDetailModal.addEventListener('click', function() {
        taskDetailModal.classList.add('hidden');
    });

    // Edit description
    editDescription.addEventListener('click', function() {
        descriptionContent.classList.add('hidden');
        descriptionEdit.classList.remove('hidden');
        descriptionTextarea.focus();
    });

    cancelEditDescription.addEventListener('click', function() {
        descriptionEdit.classList.add('hidden');
        descriptionContent.classList.remove('hidden');
    });

    saveDescription.addEventListener('click', function() {
        const newDescription = descriptionTextarea.value.trim();
        taskDescription.textContent = newDescription || 'Chưa có mô tả';
        descriptionEdit.classList.add('hidden');
        descriptionContent.classList.remove('hidden');
    });

    // Add comment
    addComment.addEventListener('click', function() {
        const commentText = newComment.value.trim();
        if (commentText) {
            const commentContainer = document.querySelector('.space-y-4');
            const newCommentElement = document.createElement('div');
            newCommentElement.className = 'flex space-x-3';
            newCommentElement.innerHTML = `
                <img class="h-8 w-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center" src="https://via.placeholder.com/32" alt="User">
                <div class="flex-1">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="flex items-center justify-between mb-1">
                            <span class="font-medium text-sm text-gray-900">You</span>
                            <span class="text-xs text-gray-500">${new Date().toLocaleString()}</span>
                        </div>
                        <p class="text-sm text-gray-700">${commentText}</p>
                    </div>
                </div>
            `;
            commentContainer.appendChild(newCommentElement);
            newComment.value = '';
        }
    });

    // Initialize action buttons
    initActionButtons();
    initLabelManagement();
    initActivityLog();
    initSubtaskManagement();
}

// Initialize action buttons functionality
function initActionButtons() {
    const addDatesBtn = document.getElementById('addDatesBtn');
    const addMembersBtn = document.getElementById('addMembersBtn');
    const addLabelBtn = document.getElementById('addLabelBtn');
    const addAttachmentBtn = document.getElementById('addAttachmentBtn');

    // Add Dates functionality
    if (addDatesBtn) {
        addDatesBtn.addEventListener('click', function() {
            const addDatesModal = document.getElementById('addDatesModal');
            addDatesModal.classList.remove('hidden');
        });
    }

    // Add Members functionality
    if (addMembersBtn) {
        addMembersBtn.addEventListener('click', function() {
            const addMembersModal = document.getElementById('addMembersModal');
            addMembersModal.classList.remove('hidden');
        });
    }

    // Add Label functionality
    if (addLabelBtn) {
        addLabelBtn.addEventListener('click', function() {
            const addLabelModal = document.getElementById('addLabelModal');
            addLabelModal.classList.remove('hidden');
        });
    }

    // Add Attachment functionality
    if (addAttachmentBtn) {
        addAttachmentBtn.addEventListener('click', function() {
            const addAttachmentModal = document.getElementById('addAttachmentModal');
            addAttachmentModal.classList.remove('hidden');
        });
    }

    // Initialize modal controls
    initModalControls();
}

// Initialize modal controls
function initModalControls() {
    // Dates Modal
    const addDatesModal = document.getElementById('addDatesModal');
    const closeDatesModal = document.getElementById('closeDatesModal');
    const cancelDates = document.getElementById('cancelDates');
    const addDatesForm = document.getElementById('addDatesForm');

    if (closeDatesModal) {
        closeDatesModal.addEventListener('click', function() {
            addDatesModal.classList.add('hidden');
        });
    }

    if (cancelDates) {
        cancelDates.addEventListener('click', function() {
            addDatesModal.classList.add('hidden');
        });
    }

    if (addDatesForm) {
        addDatesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;
            
            if (startDate && endDate) {
                addActivityLog(`Đã thêm ngày: ${startDate} đến ${endDate}`);
                addDatesModal.classList.add('hidden');
                addDatesForm.reset();
            }
        });
    }

    // Members Modal
    const addMembersModal = document.getElementById('addMembersModal');
    const closeMembersModal = document.getElementById('closeMembersModal');
    const cancelMembers = document.getElementById('cancelMembers');
    const addMemberBtns = document.querySelectorAll('.add-member-btn');

    if (closeMembersModal) {
        closeMembersModal.addEventListener('click', function() {
            addMembersModal.classList.add('hidden');
        });
    }

    if (cancelMembers) {
        cancelMembers.addEventListener('click', function() {
            addMembersModal.classList.add('hidden');
        });
    }

    addMemberBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const memberName = this.getAttribute('data-member');
            addActivityLog(`Đã thêm thành viên: ${memberName}`);
            this.textContent = 'Đã thêm';
            this.disabled = true;
            this.classList.add('bg-gray-400');
            this.classList.remove('bg-vlu-red', 'hover:bg-red-700');
        });
    });

    // Label Modal
    const addLabelModal = document.getElementById('addLabelModal');
    const closeLabelModal = document.getElementById('closeLabelModal');
    const cancelLabel = document.getElementById('cancelLabel');
    const addLabelForm = document.getElementById('addLabelForm');
    const labelColorBtns = document.querySelectorAll('.label-color-btn');

    if (closeLabelModal) {
        closeLabelModal.addEventListener('click', function() {
            addLabelModal.classList.add('hidden');
        });
    }

    if (cancelLabel) {
        cancelLabel.addEventListener('click', function() {
            addLabelModal.classList.add('hidden');
        });
    }

    let selectedColor = 'blue';
    labelColorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            labelColorBtns.forEach(b => b.classList.remove('border-vlu-red'));
            this.classList.add('border-vlu-red');
            selectedColor = this.getAttribute('data-color');
        });
    });

    if (addLabelForm) {
        addLabelForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const labelName = document.getElementById('newLabelName').value.trim();
            
            if (labelName) {
                addNewLabel(labelName, selectedColor);
                addActivityLog(`Đã thêm label: ${labelName}`);
                addLabelModal.classList.add('hidden');
                addLabelForm.reset();
            }
        });
    }

    // Attachment Modal
    const addAttachmentModal = document.getElementById('addAttachmentModal');
    const closeAttachmentModal = document.getElementById('closeAttachmentModal');
    const cancelAttachment = document.getElementById('cancelAttachment');
    const addAttachmentForm = document.getElementById('addAttachmentForm');
    const browseFiles = document.getElementById('browseFiles');
    const fileInput = document.getElementById('fileInput');
    const selectedFiles = document.getElementById('selectedFiles');

    if (closeAttachmentModal) {
        closeAttachmentModal.addEventListener('click', function() {
            addAttachmentModal.classList.add('hidden');
        });
    }

    if (cancelAttachment) {
        cancelAttachment.addEventListener('click', function() {
            addAttachmentModal.classList.add('hidden');
        });
    }

    if (browseFiles) {
        browseFiles.addEventListener('click', function() {
            fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', function() {
            selectedFiles.innerHTML = '';
            Array.from(this.files).forEach(file => {
                const fileElement = document.createElement('div');
                fileElement.className = 'flex items-center justify-between p-2 bg-gray-50 rounded';
                fileElement.innerHTML = `
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-file text-gray-500"></i>
                        <span class="text-sm text-gray-700">${file.name}</span>
                    </div>
                    <span class="text-xs text-gray-500">${(file.size / 1024).toFixed(1)} KB</span>
                `;
                selectedFiles.appendChild(fileElement);
            });
        });
    }

    if (addAttachmentForm) {
        addAttachmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const files = fileInput.files;
            if (files.length > 0) {
                Array.from(files).forEach(file => {
                    addActivityLog(`Đã đính kèm file: ${file.name}`);
                });
                addAttachmentModal.classList.add('hidden');
                addAttachmentForm.reset();
                selectedFiles.innerHTML = '';
            }
        });
    }
}

// Initialize label management
function initLabelManagement() {
    const removeLabelBtns = document.querySelectorAll('.remove-label-btn');
    
    removeLabelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const labelName = this.getAttribute('data-label');
            const labelContainer = this.closest('.flex.items-center.justify-between');
            
            labelContainer.style.transition = 'all 0.3s ease';
            labelContainer.style.opacity = '0';
            labelContainer.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                labelContainer.remove();
                addActivityLog(`Đã xóa label: ${labelName}`);
            }, 300);
        });
    });
}

// Add new label
function addNewLabel(name, color) {
    const labelsContainer = document.getElementById('labelsContainer');
    const colorClasses = {
        'blue': 'bg-blue-100 text-blue-800',
        'green': 'bg-green-100 text-green-800',
        'yellow': 'bg-yellow-100 text-yellow-800',
        'red': 'bg-red-100 text-red-800',
        'purple': 'bg-purple-100 text-purple-800'
    };

    const labelElement = document.createElement('div');
    labelElement.className = 'flex items-center justify-between';
    labelElement.innerHTML = `
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]}">
            ${name}
        </span>
        <button class="remove-label-btn text-gray-400 hover:text-red-600 text-xs transition-colors" data-label="${name}">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add click event for remove button
    const removeBtn = labelElement.querySelector('.remove-label-btn');
    removeBtn.addEventListener('click', function() {
        labelElement.style.transition = 'all 0.3s ease';
        labelElement.style.opacity = '0';
        labelElement.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            labelElement.remove();
            addActivityLog(`Đã xóa label: ${name}`);
        }, 300);
    });

    labelsContainer.appendChild(labelElement);
}

// Initialize activity log
function initActivityLog() {
    // Activity log is already initialized with the initial entry
}

// Initialize subtask management
function initSubtaskManagement() {
    const addSubtaskItem = document.getElementById('addSubtaskItem');
    const addSubtaskModal = document.getElementById('addSubtaskModal');
    const closeSubtaskModal = document.getElementById('closeSubtaskModal');
    const cancelSubtask = document.getElementById('cancelSubtask');
    const addSubtaskForm = document.getElementById('addSubtaskForm');
    const subtasksContainer = document.getElementById('subtasksContainer');

    // Open subtask modal
    if (addSubtaskItem) {
        addSubtaskItem.addEventListener('click', function() {
            addSubtaskModal.classList.remove('hidden');
            document.getElementById('newSubtaskName').focus();
        });
    }

    // Close modal
    if (closeSubtaskModal) {
        closeSubtaskModal.addEventListener('click', function() {
            addSubtaskModal.classList.add('hidden');
        });
    }

    if (cancelSubtask) {
        cancelSubtask.addEventListener('click', function() {
            addSubtaskModal.classList.add('hidden');
        });
    }

    // Add new subtask
    if (addSubtaskForm) {
        addSubtaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const subtaskName = document.getElementById('newSubtaskName').value.trim();
            const subtaskDescription = document.getElementById('newSubtaskDescription').value.trim();
            
            if (subtaskName) {
                addNewSubtask(subtaskName, subtaskDescription);
                addActivityLog(`Đã thêm subtask: ${subtaskName}`);
                addSubtaskModal.classList.add('hidden');
                addSubtaskForm.reset();
            }
        });
    }

    // Initialize existing subtask controls
    initSubtaskControls();
}

// Add new subtask
function addNewSubtask(name, description = '') {
    const subtasksContainer = document.getElementById('subtasksContainer');
    const subtaskElement = document.createElement('div');
    subtaskElement.className = 'subtask-item flex items-center space-x-3 p-2 hover:bg-gray-50 rounded';
    subtaskElement.innerHTML = `
        <input type="checkbox" class="rounded text-vlu-red focus:ring-vlu-red">
        <span class="flex-1 text-sm text-gray-700">${name}</span>
        <button class="remove-subtask-btn text-gray-400 hover:text-red-600 text-xs">
            <i class="fas fa-trash"></i>
        </button>
    `;

    // Add click event for remove button
    const removeBtn = subtaskElement.querySelector('.remove-subtask-btn');
    removeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        const subtaskName = subtaskElement.querySelector('span').textContent;
        
        // Add confirmation dialog
        if (confirm(`Bạn có chắc chắn muốn xóa subtask "${subtaskName}"?`)) {
            removeSubtaskWithAnimation(subtaskElement, subtaskName);
        }
    });

    // Add checkbox functionality
    const checkbox = subtaskElement.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', function() {
        const subtaskName = subtaskElement.querySelector('span').textContent;
        if (this.checked) {
            addActivityLog(`Đã hoàn thành subtask: ${subtaskName}`);
        } else {
            addActivityLog(`Đã bỏ hoàn thành subtask: ${subtaskName}`);
        }
    });

    subtasksContainer.appendChild(subtaskElement);
}

// Initialize subtask controls
function initSubtaskControls() {
    const removeSubtaskBtns = document.querySelectorAll('.remove-subtask-btn');
    const subtaskCheckboxes = document.querySelectorAll('.subtask-item input[type="checkbox"]');
    
    // Remove subtask functionality
    removeSubtaskBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            const subtaskItem = this.closest('.subtask-item');
            const subtaskName = subtaskItem.querySelector('span').textContent;
            
            // Add confirmation dialog
            if (confirm(`Bạn có chắc chắn muốn xóa subtask "${subtaskName}"?`)) {
                removeSubtaskWithAnimation(subtaskItem, subtaskName);
            }
        });
    });

    // Checkbox functionality
    subtaskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const subtaskItem = this.closest('.subtask-item');
            const subtaskName = subtaskItem.querySelector('span').textContent;
            
            if (this.checked) {
                subtaskItem.classList.add('completed');
                addActivityLog(`Đã hoàn thành subtask: ${subtaskName}`);
                showNotification(`Đã hoàn thành subtask "${subtaskName}"`, 'success');
            } else {
                subtaskItem.classList.remove('completed');
                addActivityLog(`Đã bỏ hoàn thành subtask: ${subtaskName}`);
                showNotification(`Đã bỏ hoàn thành subtask "${subtaskName}"`, 'info');
            }
        });
    });
}

// Remove subtask with animation
function removeSubtaskWithAnimation(subtaskItem, subtaskName) {
    // Add fade out animation
    subtaskItem.style.transition = 'all 0.3s ease';
    subtaskItem.style.opacity = '0';
    subtaskItem.style.transform = 'translateX(-100%)';
    subtaskItem.style.height = '0';
    subtaskItem.style.margin = '0';
    subtaskItem.style.padding = '0';
    
    // Remove from DOM after animation
    setTimeout(() => {
        if (subtaskItem.parentNode) {
            subtaskItem.parentNode.removeChild(subtaskItem);
            
            // Add to activity log
            addActivityLog(`Đã xóa subtask: ${subtaskName}`);
            
            // Show notification
            showNotification(`Đã xóa subtask "${subtaskName}"`, 'success');
            
            // Update subtask count if needed
            updateSubtaskCount();
        }
    }, 300);
}

// Update subtask count
function updateSubtaskCount() {
    const subtasksContainer = document.getElementById('subtasksContainer');
    if (subtasksContainer) {
        const totalSubtasks = subtasksContainer.querySelectorAll('.subtask-item').length;
        const completedSubtasks = subtasksContainer.querySelectorAll('.subtask-item.completed').length;
        
        // Update subtask header if count is shown
        const subtaskHeader = document.querySelector('#subtasksContainer').previousElementSibling;
        if (subtaskHeader && subtaskHeader.querySelector('h4')) {
            const header = subtaskHeader.querySelector('h4');
            header.textContent = `Subtasks (${completedSubtasks}/${totalSubtasks})`;
        }
    }
}

// Add activity log entry
function addActivityLog(action) {
    const activityContainer = document.getElementById('activityContainer');
    const newActivity = document.createElement('div');
    newActivity.className = 'flex items-start space-x-3';
    newActivity.innerHTML = `
        <img class="h-6 w-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center" src="https://via.placeholder.com/24" alt="User">
        <div class="flex-1">
            <p class="text-sm text-gray-700">${action}</p>
            <p class="text-xs text-gray-500">${new Date().toLocaleString()}</p>
        </div>
    `;
    
    activityContainer.insertBefore(newActivity, activityContainer.firstChild);
}

// Export functions for global use
window.VLUTaskMate = {
    showNotification,
    addComment,
    updateTaskCount,
    addMemberToList,
    initKickMember,
    initAddCard,
    initTaskDetail,
    initTaskDetailControls,
    initActionButtons,
    initLabelManagement,
    addNewLabel,
    addActivityLog,
    initSubtaskManagement,
    addNewSubtask,
    removeSubtaskWithAnimation,
    updateSubtaskCount,
    initDragDrop,
    initDragDropForCard
};

// Initialize evaluation status check
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a project page
    const evaluationTab = document.querySelector('[data-tab="evaluation"]');
    if (evaluationTab) {
        // Add click listener for evaluation tab
        evaluationTab.addEventListener('click', function() {
            setTimeout(() => {
                checkProjectStatus();
            }, 100);
        });
    }
});

// Global function to check project status
function checkProjectStatus() {
    const evaluationStatus = document.getElementById('evaluationStatus');
    const evaluationContent = document.getElementById('evaluationContent');
    
    if (evaluationStatus && evaluationContent) {
        // Simulate project status check
        const projectStatus = getProjectStatus();
        
        if (projectStatus === 'completed') {
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
            evaluationContent.style.display = 'block';
        } else if (projectStatus === 'active') {
            // Project is active - show not allowed message
            evaluationStatus.innerHTML = `
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-red-900">Không được phép đánh giá</h4>
                            <p class="text-sm text-red-700">Dự án đang hoạt động, chỉ có thể đánh giá khi dự án đã hoàn thành</p>
                        </div>
                    </div>
                </div>
            `;
            evaluationContent.style.display = 'none';
        } else if (projectStatus === 'pending') {
            // Project is pending - show waiting message
            evaluationStatus.innerHTML = `
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <i class="fas fa-clock text-yellow-500 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-yellow-900">Chưa đến thời điểm</h4>
                            <p class="text-sm text-yellow-700">Dự án đang chờ phê duyệt, chỉ có thể đánh giá khi dự án đã hoàn thành</p>
                        </div>
                    </div>
                </div>
            `;
            evaluationContent.style.display = 'none';
        } else if (projectStatus === 'paused') {
            // Project is paused - show paused message
            evaluationStatus.innerHTML = `
                <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <i class="fas fa-pause text-purple-500 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-purple-900">Dự án tạm dừng</h4>
                            <p class="text-sm text-purple-700">Dự án đang tạm dừng, chỉ có thể đánh giá khi dự án đã hoàn thành</p>
                        </div>
                    </div>
                </div>
            `;
            evaluationContent.style.display = 'none';
        } else {
            // Default case - show waiting message
            evaluationStatus.innerHTML = `
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <i class="fas fa-clock text-yellow-500 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-yellow-900">Chưa đến thời điểm</h4>
                            <p class="text-sm text-yellow-700">Đánh giá chỉ có thể thực hiện khi dự án đã hoàn thành</p>
                        </div>
                    </div>
                </div>
            `;
            evaluationContent.style.display = 'none';
        }
    }
}

// Function to get project status based on UI elements
function getProjectStatus() {
    // Check for project status tag in the UI
    const statusTags = document.querySelectorAll('.inline-flex.items-center.px-2\\.5.py-0\\.5.rounded-full.text-xs.font-medium');
    
    for (let tag of statusTags) {
        const tagText = tag.textContent.trim();
        
        // Check if it's a status tag (not role tag)
        if (tagText.includes('Đang hoạt động') || tagText.includes('Active')) {
            return 'active';
        } else if (tagText.includes('Đã hoàn tất') || tagText.includes('Completed')) {
            return 'completed';
        } else if (tagText.includes('Chờ phê duyệt') || tagText.includes('Pending')) {
            return 'pending';
        } else if (tagText.includes('Tạm dừng') || tagText.includes('Paused')) {
            return 'paused';
        }
    }
    
    // Fallback: check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectStatus = urlParams.get('status') || 'active';
    
    // Fallback: check by date
    const currentDate = new Date();
    const projectEndDate = new Date('2024-12-15');
    
    if (currentDate >= projectEndDate) {
        return 'completed';
    } else {
        return 'active';
    }
} 

// Notification dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const closeNotifications = document.getElementById('closeNotifications');

    if (notificationBtn && notificationDropdown) {
        // Toggle dropdown
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking close button
        if (closeNotifications) {
            closeNotifications.addEventListener('click', function() {
                notificationDropdown.classList.add('hidden');
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationDropdown.classList.add('hidden');
            }
        });

        // Handle notification actions
        document.querySelectorAll('.bg-green-500').forEach(button => {
            button.addEventListener('click', function() {
                // Handle accept action
                console.log('Accepted notification');
                // Here you would typically send an API request
                alert('Đã xác nhận!');
            });
        });

        document.querySelectorAll('.bg-red-500').forEach(button => {
            button.addEventListener('click', function() {
                // Handle reject action
                console.log('Rejected notification');
                // Here you would typically send an API request
                alert('Đã từ chối!');
            });
        });

        document.querySelectorAll('.bg-blue-500').forEach(button => {
            button.addEventListener('click', function() {
                // Handle view details action
                console.log('Viewing notification details');
                // Here you would typically navigate to the relevant page
                alert('Đang chuyển đến trang chi tiết...');
            });
        });
    }
}); 