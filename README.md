# VLUTaskMate - Prototype UI

Ứng dụng quản lý dự án sinh viên VLUTaskMate với giao diện hiện đại, trực quan và dễ thao tác.

## 🎯 Tính năng chính

### 👥 Quản lý vai trò
- **Team Leader**: Quản lý dự án, tạo task, mời thành viên, đánh giá
- **Team Member**: Thực hiện task, cập nhật tiến độ, bình luận

### 📋 Quản lý dự án
- Dashboard tổng quan dự án
- Kanban board với drag-drop
- Quản lý thành viên nhóm
- Đánh giá peer-to-peer
- Đóng dự án an toàn

### ✅ Quản lý task
- Tạo và phân công task
- Subtask với checkbox
- Bình luận với @mention
- Lịch sử hoạt động
- Deadline tracking

## 🚀 Cấu trúc dự án

```
VLUTaskMate/
├── Student/
│   ├── login.html          # Trang đăng nhập
│   ├── index.html          # Dashboard chính
│   ├── project.html        # Chi tiết dự án
│   └── task-detail.html    # Chi tiết task
└── assets/
    ├── script.js           # JavaScript chính
    └── style.css           # CSS tùy chỉnh
```

## 🎨 Giao diện

### 🟦 Trang Đăng Nhập (login.html)
- Logo VLUTaskMate
- Đăng nhập bằng Microsoft
- Validation email VLU (@vlu.edu.vn)
- Hướng dẫn đăng nhập nhanh

### 🟩 Dashboard (index.html)
- **Sidebar**: Dự án của tôi, Nhiệm vụ, Thông báo, Tài khoản
- **Project Tabs**: Dự án làm Leader, Dự án tham gia
- **Main Content**: Danh sách dự án phân chia theo vai trò
- **Project Cards**: Tên, vai trò (Leader/Member), trạng thái, timeline
- **Actions**: Tạo dự án mới với start date, end date và mời thành viên, vào dự án

### 🟨 Chi tiết Dự án (project.html)
- **Navigation Tabs**: Thành viên, Nhiệm vụ, Đánh giá, Đóng dự án
- **Members Tab**: Danh sách thành viên với trạng thái pending, mời/xóa, chuyển quyền
- **Tasks Tab**: Kanban board (To Do, In Progress, Review, Done)
- **Evaluation Tab**: Đánh giá peer-to-peer với điểm và nhận xét
- **Close Tab**: Kiểm tra điều kiện và đóng dự án

### 🟫 Chi tiết Task (task-detail.html)
- **Task Info**: Tiêu đề, mô tả, deadline, người được giao
- **Subtasks**: Danh sách với checkbox
- **Comments**: Bình luận với @mention, edit/delete
- **Activity History**: Lịch sử hoạt động
- **Actions**: Hoàn thành, chỉnh sửa, xóa task

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **Tailwind CSS**: Styling hiện đại và responsive
- **JavaScript**: Tương tác và logic cơ bản
- **Font Awesome**: Icons
- **Custom CSS**: Animation và effects

## 🎯 Tính năng JavaScript

### Modal Management
- Tạo dự án mới với start date, end date và mời thành viên
- Mời thành viên (email VLU validation)
- Tạo task mới
- Thêm subtask

### Tab Switching
- Chuyển đổi giữa các tab trong project detail
- Active state management

### Drag & Drop
- Kanban board drag-drop
- Task card movement
- Visual feedback

### Form Handling
- Validation email VLU
- Date validation (start date, end date)
- Submit forms với feedback
- Loading states

### User Experience
- Smooth animations
- Hover effects
- Responsive design
- Accessibility features

## 🎨 Theme & Design

### Color Scheme
- **Primary**: VLU Red (#dc2626)
- **Secondary**: Gray tones
- **Accent**: Blue for Microsoft integration

### Typography
- **Font**: Inter (system fonts fallback)
- **Weights**: Regular, Medium, Semibold, Bold

### Components
- **Cards**: Hover effects, shadows
- **Buttons**: Primary/Secondary styles
- **Modals**: Backdrop blur, animations
- **Forms**: Focus states, validation

## 📱 Responsive Design

- **Desktop**: Full sidebar layout
- **Tablet**: Collapsible sidebar
- **Mobile**: Stacked layout, touch-friendly

## 🔧 Cách sử dụng

1. **Mở trang đăng nhập**: `Student/login.html`
2. **Đăng nhập**: Sử dụng email VLU hoặc Microsoft
3. **Dashboard**: Xem dự án và tạo mới
4. **Project Detail**: Quản lý task và thành viên
5. **Task Detail**: Xem chi tiết và bình luận

## 🚀 Tính năng nổi bật

### ✨ Modern UI/UX
- Clean, minimalist design
- Smooth animations
- Intuitive navigation
- Consistent branding

### 🔄 Interactive Elements
- Drag-drop Kanban
- Real-time updates
- Modal dialogs
- Form validation

### 📊 Data Visualization
- Progress indicators
- Status badges
- Priority tags
- Activity timeline

### 🔐 Security Features
- VLU email validation
- Role-based access
- Safe project closure
- Anonymous peer evaluation

## 🎯 Roadmap

### Phase 1 ✅ (Current)
- Basic UI prototype
- Core functionality
- Responsive design

### Phase 2 🔄 (Planned)
- Backend integration
- Real-time collaboration
- File attachments
- Advanced analytics

### Phase 3 🔮 (Future)
- Mobile app
- AI-powered insights
- Integration with VLU systems
- Advanced reporting

## 👨‍💻 Development

### Local Development
```bash
# Clone repository
git clone [repository-url]

# Open in browser
# Navigate to Student/login.html
```

### File Structure
- **HTML**: Semantic structure
- **CSS**: Tailwind + custom styles
- **JS**: Modular functions
- **Assets**: Organized resources

## 📄 License

© 2024 VLUTaskMate. Phát triển bởi Khoa Công nghệ Thông tin VLU.

---

**VLUTaskMate** - Quản lý dự án sinh viên VLU một cách hiệu quả và trực quan! 🎓✨