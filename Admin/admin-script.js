// VLUTaskMate - Admin JavaScript File
// Special functions for Administrator interface

document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin script loaded');
    
    // Check admin authentication
    checkAdminAuth();
    
    // Initialize admin components
    initAdminDashboard();
    initSystemSettings();
    initStudentAccounts();
    initGroupMonitoring();
    initEvaluationOverview();
    initAdminAuthentication();
    
    console.log('Admin components initialized');
});

// Admin Authentication
function checkAdminAuth() {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
        window.location.href = '../login.html';
        return;
    }

    const user = JSON.parse(userInfo);
    if (user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang Admin!');
        window.location.href = '../login.html';
        return;
    }

    // Update admin info in header
    updateAdminInfo(user);
}

function updateAdminInfo(user) {
    const userNameElements = document.querySelectorAll('#userName');
    const userEmailElements = document.querySelectorAll('#userEmail');
    
    userNameElements.forEach(element => {
        if (element) element.textContent = user.name;
    });
    
    userEmailElements.forEach(element => {
        if (element) element.textContent = user.email;
    });
}

function initAdminAuthentication() {
    // Logout functionality
    const logoutLinks = document.querySelectorAll('a[href="../logout.html"]');
    console.log('Found logout links:', logoutLinks.length);
    
    logoutLinks.forEach((link, index) => {
        console.log(`Adding logout listener to link ${index}:`, link);
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Logout clicked');
            localStorage.removeItem('userInfo');
            window.location.href = '../logout.html';
        });
    });

    // User menu dropdown functionality
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenu = document.getElementById('userMenu');

    console.log('User menu elements:', { userMenuBtn, userMenu });

    if (userMenuBtn && userMenu) {
        userMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            userMenu.classList.toggle('hidden');
            console.log('User menu toggled');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!userMenuBtn.contains(event.target) && !userMenu.contains(event.target)) {
                userMenu.classList.add('hidden');
            }
        });
        
        console.log('User menu event listeners added');
    } else {
        console.error('User menu elements not found');
    }
}

// Mock Data for Admin
const adminMockData = {
    semesters: [
        {
            id: 1,
            name: 'Học kỳ 1 - Năm học 2024-2025',
            startDate: '2024-09-01',
            endDate: '2024-12-31',
            status: 'active',
            courses: 15,
            students: 450,
            groups: 75
        },
        {
            id: 2,
            name: 'Học kỳ 2 - Năm học 2024-2025',
            startDate: '2025-01-01',
            endDate: '2025-04-30',
            status: 'upcoming',
            courses: 12,
            students: 420,
            groups: 70
        }
    ],
    students: [
        {
            id: 'SV001',
            name: 'Hồ Du Tuấn Đạt',
            email: 'student@vlu.edu.vn',
            class: 'CNTT-K15',
            major: 'Công nghệ thông tin',
            status: 'active',
            joinDate: '2024-09-01',
            groups: [
                { id: 'G001', name: 'Nhóm 1 - Thư viện', role: 'Leader', status: 'active' },
                { id: 'G002', name: 'Nhóm 2 - E-commerce', role: 'Member', status: 'completed' }
            ],
            evaluations: [
                { group: 'G001', score: 8.5, date: '2024-12-15' },
                { group: 'G002', score: 7.8, date: '2024-11-10' }
            ]
        },
        {
            id: 'SV002',
            name: 'Nguyễn Thị Anh',
            email: 'anh.nguyen@vlu.edu.vn',
            class: 'CNTT-K15',
            major: 'Công nghệ thông tin',
            status: 'active',
            joinDate: '2024-09-01',
            groups: [
                { id: 'G003', name: 'Nhóm 3 - Mobile Banking', role: 'Member', status: 'active' }
            ],
            evaluations: [
                { group: 'G003', score: 8.2, date: '2024-12-20' }
            ]
        }
    ],
    groups: [
        {
            id: 'G001',
            name: 'Nhóm 1 - Thư viện',
            project: 'Hệ thống Quản lý Thư viện',
            leader: 'Hồ Du Tuấn Đạt',
            members: 5,
            status: 'active',
            progress: 75,
            tasks: [
                { id: 'T001', title: 'Thiết kế giao diện', status: 'completed', assignee: 'Hồ Du Tuấn Đạt' },
                { id: 'T002', title: 'Phát triển backend', status: 'in-progress', assignee: 'Nguyễn Văn A' },
                { id: 'T003', title: 'Testing', status: 'todo', assignee: 'Trần Thị B' }
            ]
        },
        {
            id: 'G002',
            name: 'Nhóm 2 - E-commerce',
            project: 'Website E-commerce',
            leader: 'Hồ Du Tuấn Đạt',
            members: 6,
            status: 'completed',
            progress: 100,
            tasks: [
                { id: 'T004', title: 'Thiết kế UI/UX', status: 'completed', assignee: 'Hồ Du Tuấn Đạt' },
                { id: 'T005', title: 'Phát triển frontend', status: 'completed', assignee: 'Lê Văn C' },
                { id: 'T006', title: 'Phát triển backend', status: 'completed', assignee: 'Phạm Thị D' }
            ]
        }
    ],
    evaluations: [
        {
            id: 'E001',
            groupId: 'G001',
            groupName: 'Nhóm 1 - Thư viện',
            evaluator: 'Anonymous',
            evaluatee: 'Hồ Du Tuấn Đạt',
            score: 8.5,
            positiveTags: ['Đúng hạn', 'Có trách nhiệm', 'Giao tiếp tốt'],
            negativeTags: [],
            comment: 'Làm việc rất tốt, luôn hoàn thành đúng deadline',
            date: '2024-12-15'
        },
        {
            id: 'E002',
            groupId: 'G002',
            groupName: 'Nhóm 2 - E-commerce',
            evaluator: 'Anonymous',
            evaluatee: 'Hồ Du Tuấn Đạt',
            score: 7.8,
            positiveTags: ['Sáng tạo', 'Gắn kết nhóm'],
            negativeTags: ['Thiếu linh hoạt'],
            comment: 'Có ý tưởng tốt nhưng cần linh hoạt hơn',
            date: '2024-11-10'
        }
    ]
};

// Admin Dashboard
function initAdminDashboard() {
    updateDashboardStats();
    initRecentActivities();
    initSystemHealth();
}

function updateDashboardStats() {
    const stats = {
        totalStudents: adminMockData.students.length,
        totalGroups: adminMockData.groups.length,
        activeSemesters: adminMockData.semesters.filter(s => s.status === 'active').length,
        totalEvaluations: adminMockData.evaluations.length
    };

    // Update stats in dashboard
    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = stats[key];
        }
    });
}

function initRecentActivities() {
    const activitiesContainer = document.getElementById('recentActivities');
    if (!activitiesContainer) return;

    const activities = [
        { action: 'Tạo học kỳ mới', user: 'Admin', time: '2 giờ trước' },
        { action: 'Thêm sinh viên mới', user: 'Admin', time: '4 giờ trước' },
        { action: 'Cập nhật quyền Leader', user: 'Admin', time: '6 giờ trước' },
        { action: 'Xuất báo cáo đánh giá', user: 'Admin', time: '1 ngày trước' }
    ];

    activitiesContainer.innerHTML = activities.map(activity => `
        <div class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <div class="w-2 h-2 bg-green-500 rounded-full"></div>
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">${activity.action}</p>
                <p class="text-xs text-gray-500">${activity.user} • ${activity.time}</p>
            </div>
        </div>
    `).join('');
}

function initSystemHealth() {
    const healthContainer = document.getElementById('systemHealth');
    if (!healthContainer) return;

    const healthStatus = [
        { service: 'Database', status: 'online', color: 'green' },
        { service: 'Authentication', status: 'online', color: 'green' },
        { service: 'File Storage', status: 'online', color: 'green' },
        { service: 'Email Service', status: 'warning', color: 'yellow' }
    ];

    healthContainer.innerHTML = healthStatus.map(item => `
        <div class="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
            <span class="text-sm font-medium text-gray-900">${item.service}</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${item.color}-100 text-${item.color}-800">
                <span class="w-2 h-2 bg-${item.color}-500 rounded-full mr-1"></span>
                ${item.status}
            </span>
        </div>
    `).join('');
}

// System Settings
function initSystemSettings() {
    initSemesterManagement();
    initPermissionSettings();
    initSystemLogs();
}

function initSemesterManagement() {
    const addSemesterBtn = document.getElementById('addSemesterBtn');
    const semesterForm = document.getElementById('semesterForm');
    const semestersList = document.getElementById('semestersList');

    if (addSemesterBtn) {
        addSemesterBtn.addEventListener('click', () => {
            document.getElementById('addSemesterModal').classList.remove('hidden');
        });
    }

    if (semesterForm) {
        semesterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(semesterForm);
            const semester = {
                name: formData.get('name'),
                startDate: formData.get('startDate'),
                endDate: formData.get('endDate'),
                status: formData.get('status')
            };
            
            addSemester(semester);
            semesterForm.reset();
            document.getElementById('addSemesterModal').classList.add('hidden');
        });
    }

    if (semestersList) {
        renderSemestersList();
    }
}

function addSemester(semester) {
    const newSemester = {
        id: Date.now(),
        ...semester,
        courses: 0,
        students: 0,
        groups: 0
    };
    
    adminMockData.semesters.push(newSemester);
    renderSemestersList();
    showNotification('Thành công', 'Học kỳ đã được thêm');
}

function renderSemestersList() {
    const semestersList = document.getElementById('semestersList');
    if (!semestersList) return;

    semestersList.innerHTML = adminMockData.semesters.map(semester => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${semester.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${semester.startDate}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${semester.endDate}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    semester.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }">
                    ${semester.status === 'active' ? 'Đang hoạt động' : 'Sắp tới'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${semester.courses}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${semester.students}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${semester.groups}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3">Sửa</button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteSemester(${semester.id})">Xóa</button>
            </td>
        </tr>
    `).join('');
}

function deleteSemester(id) {
    if (confirm('Bạn có chắc chắn muốn xóa học kỳ này?')) {
        adminMockData.semesters = adminMockData.semesters.filter(s => s.id !== id);
        renderSemestersList();
        showNotification('Thành công', 'Học kỳ đã được xóa');
    }
}

function initPermissionSettings() {
    const leaderToggle = document.getElementById('leaderToggle');
    const memberToggle = document.getElementById('memberToggle');

    if (leaderToggle) {
        leaderToggle.addEventListener('change', () => {
            showNotification('Thành công', 'Quyền Leader đã được cập nhật');
        });
    }

    if (memberToggle) {
        memberToggle.addEventListener('change', () => {
            showNotification('Thành công', 'Quyền Member đã được cập nhật');
        });
    }
}

function initSystemLogs() {
    const logsContainer = document.getElementById('systemLogs');
    if (!logsContainer) return;

    const logs = [
        { action: 'Tạo học kỳ mới', user: 'admin@adminvlu.vn', timestamp: '2024-12-20 14:30:00' },
        { action: 'Thêm sinh viên', user: 'admin@adminvlu.vn', timestamp: '2024-12-20 13:15:00' },
        { action: 'Cập nhật quyền', user: 'admin@adminvlu.vn', timestamp: '2024-12-20 12:45:00' },
        { action: 'Xuất báo cáo', user: 'admin@adminvlu.vn', timestamp: '2024-12-20 11:20:00' }
    ];

    logsContainer.innerHTML = logs.map(log => `
        <div class="flex items-center space-x-3 p-3 border-b border-gray-200 last:border-b-0">
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">${log.action}</p>
                <p class="text-xs text-gray-500">${log.user} • ${log.timestamp}</p>
            </div>
        </div>
    `).join('');
}

// Student Accounts
function initStudentAccounts() {
    initStudentSearch();
    renderStudentsTable();
}

function initStudentSearch() {
    const searchInput = document.getElementById('studentSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            filterStudents(query);
        });
    }
}

function filterStudents(query) {
    const filteredStudents = adminMockData.students.filter(student => 
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.class.toLowerCase().includes(query)
    );
    
    renderStudentsTable(filteredStudents);
}

function renderStudentsTable(students = adminMockData.students) {
    const studentsTable = document.getElementById('studentsTable');
    if (!studentsTable) return;

    studentsTable.innerHTML = students.map(student => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${student.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${student.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.email}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.class}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.major}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }">
                    ${student.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${student.groups.length}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900" onclick="viewStudentDetail('${student.id}')">Xem chi tiết</button>
            </td>
        </tr>
    `).join('');
}

function viewStudentDetail(studentId) {
    const student = adminMockData.students.find(s => s.id === studentId);
    if (!student) return;

    const modal = document.getElementById('studentDetailModal');
    if (modal) {
        // Populate student details
        modal.querySelector('#studentName').textContent = student.name;
        modal.querySelector('#studentEmail').textContent = student.email;
        modal.querySelector('#studentId').textContent = student.id;
        modal.querySelector('#studentClass').textContent = student.class;
        modal.querySelector('#studentMajor').textContent = student.major;
        modal.querySelector('#studentStatus').textContent = student.status === 'active' ? 'Hoạt động' : 'Vô hiệu';
        modal.querySelector('#studentJoinDate').textContent = student.joinDate;

        // Render group history
        const groupsList = modal.querySelector('#studentGroups');
        groupsList.innerHTML = student.groups.map(group => `
            <div class="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                <div>
                    <p class="text-sm font-medium text-gray-900">${group.name}</p>
                    <p class="text-xs text-gray-500">Vai trò: ${group.role} • Trạng thái: ${group.status}</p>
                </div>
            </div>
        `).join('');

        // Render evaluation history
        const evaluationsList = modal.querySelector('#studentEvaluations');
        evaluationsList.innerHTML = student.evaluations.map(eval => `
            <div class="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                <div>
                    <p class="text-sm font-medium text-gray-900">${eval.group}</p>
                    <p class="text-xs text-gray-500">Điểm: ${eval.score}/10 • Ngày: ${eval.date}</p>
                </div>
            </div>
        `).join('');

        modal.classList.remove('hidden');
    }
}

// Group Monitoring
function initGroupMonitoring() {
    initGroupFilters();
    renderGroupsList();
}

function initGroupFilters() {
    const filterSelects = document.querySelectorAll('.group-filter');
    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            applyGroupFilters();
        });
    });
}

function applyGroupFilters() {
    const semesterFilter = document.getElementById('semesterFilter')?.value;
    const statusFilter = document.getElementById('statusFilter')?.value;
    
    let filteredGroups = adminMockData.groups;
    
    if (statusFilter && statusFilter !== 'all') {
        filteredGroups = filteredGroups.filter(group => group.status === statusFilter);
    }
    
    renderGroupsList(filteredGroups);
}

function renderGroupsList(groups = adminMockData.groups) {
    const groupsList = document.getElementById('groupsList');
    if (!groupsList) return;

    groupsList.innerHTML = groups.map(group => `
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-semibold text-gray-900">${group.name}</h3>
                    <p class="text-sm text-gray-500 mt-1">${group.project}</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    group.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }">
                    ${group.status === 'active' ? 'Đang hoạt động' : 'Đã hoàn tất'}
                </span>
            </div>
            <div class="flex items-center justify-between mb-4">
                <div class="text-sm text-gray-500">
                    <p>Trưởng nhóm: ${group.leader}</p>
                    <p>Thành viên: ${group.members} người</p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-medium text-gray-900">${group.progress}%</p>
                    <p class="text-xs text-gray-500">Tiến độ</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="text-sm text-gray-500">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        ${group.tasks.filter(t => t.status === 'completed').length}/${group.tasks.length} tasks
                    </span>
                </div>
                <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium" onclick="viewGroupDetail('${group.id}')">
                    Xem chi tiết
                </button>
            </div>
        </div>
    `).join('');
}

function viewGroupDetail(groupId) {
    const group = adminMockData.groups.find(g => g.id === groupId);
    if (!group) return;

    const modal = document.getElementById('groupDetailModal');
    if (modal) {
        // Populate group details
        modal.querySelector('#groupName').textContent = group.name;
        modal.querySelector('#groupProject').textContent = group.project;
        modal.querySelector('#groupLeader').textContent = group.leader;
        modal.querySelector('#groupMembers').textContent = group.members;
        modal.querySelector('#groupStatus').textContent = group.status === 'active' ? 'Đang hoạt động' : 'Đã hoàn tất';
        modal.querySelector('#groupProgress').textContent = `${group.progress}%`;

        // Render tasks
        const tasksList = modal.querySelector('#groupTasks');
        tasksList.innerHTML = group.tasks.map(task => `
            <div class="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                <div>
                    <p class="text-sm font-medium text-gray-900">${task.title}</p>
                    <p class="text-xs text-gray-500">Người thực hiện: ${task.assignee}</p>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                }">
                    ${task.status === 'completed' ? 'Hoàn thành' :
                      task.status === 'in-progress' ? 'Đang thực hiện' : 'Chờ thực hiện'}
                </span>
            </div>
        `).join('');

        modal.classList.remove('hidden');
    }
}

// Evaluation Overview
function initEvaluationOverview() {
    updateEvaluationStats();
    renderEvaluationsTable();
}

function updateEvaluationStats() {
    const stats = {
        totalEvaluations: adminMockData.evaluations.length,
        averageScore: (adminMockData.evaluations.reduce((sum, eval) => sum + eval.score, 0) / adminMockData.evaluations.length).toFixed(1),
        totalGroups: new Set(adminMockData.evaluations.map(e => e.groupId)).size,
        totalStudents: new Set(adminMockData.evaluations.map(e => e.evaluatee)).size
    };

    Object.keys(stats).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = stats[key];
        }
    });
}

function renderEvaluationsTable() {
    const evaluationsTable = document.getElementById('evaluationsTable');
    if (!evaluationsTable) return;

    evaluationsTable.innerHTML = adminMockData.evaluations.map(eval => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${eval.groupName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${eval.evaluatee}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${eval.score}/10</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${eval.date}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3" onclick="viewEvaluationDetail('${eval.id}')">Xem chi tiết</button>
                <button class="text-green-600 hover:text-green-900" onclick="exportEvaluation('${eval.id}')">Xuất</button>
            </td>
        </tr>
    `).join('');
}

function viewEvaluationDetail(evalId) {
    const evaluation = adminMockData.evaluations.find(e => e.id === evalId);
    if (!evaluation) return;

    const modal = document.getElementById('evaluationDetailModal');
    if (modal) {
        modal.querySelector('#evalGroup').textContent = evaluation.groupName;
        modal.querySelector('#evalStudent').textContent = evaluation.evaluatee;
        modal.querySelector('#evalScore').textContent = `${evaluation.score}/10`;
        modal.querySelector('#evalDate').textContent = evaluation.date;
        modal.querySelector('#evalComment').textContent = evaluation.comment;

        // Render tags
        const positiveTags = modal.querySelector('#positiveTags');
        const negativeTags = modal.querySelector('#negativeTags');
        
        positiveTags.innerHTML = evaluation.positiveTags.map(tag => 
            `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2 mb-2">${tag}</span>`
        ).join('');
        
        negativeTags.innerHTML = evaluation.negativeTags.map(tag => 
            `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2 mb-2">${tag}</span>`
        ).join('');

        modal.classList.remove('hidden');
    }
}

function exportEvaluation(evalId) {
    // Simulate export functionality
    showNotification('Thành công', 'Báo cáo đánh giá đã được xuất');
}

// Utility Functions
function showNotification(title, message) {
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
    
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Export functions for global use
window.AdminVLUTaskMate = {
    showNotification,
    adminMockData,
    checkAdminAuth,
    updateAdminInfo
}; 