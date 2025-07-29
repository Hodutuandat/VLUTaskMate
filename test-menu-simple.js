// Simple Menu Test JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple menu test loaded');
    
    // Test notification dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const closeNotifications = document.getElementById('closeNotifications');
    
    console.log('Notification elements:', {
        btn: notificationBtn,
        dropdown: notificationDropdown,
        close: closeNotifications
    });
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Notification button clicked');
            
            const isHidden = notificationDropdown.classList.contains('hidden');
            if (isHidden) {
                notificationDropdown.classList.remove('hidden');
                console.log('Notification dropdown shown');
            } else {
                notificationDropdown.classList.add('hidden');
                console.log('Notification dropdown hidden');
            }
        });
    }
    
    if (closeNotifications && notificationDropdown) {
        closeNotifications.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close notification clicked');
            notificationDropdown.classList.add('hidden');
        });
    }
    
    // Test user menu dropdown
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userMenuDropdown = document.getElementById('userMenuDropdown');
    
    console.log('User menu elements:', {
        btn: userMenuBtn,
        dropdown: userMenuDropdown
    });
    
    if (userMenuBtn && userMenuDropdown) {
        userMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('User menu button clicked');
            
            const isHidden = userMenuDropdown.classList.contains('hidden');
            if (isHidden) {
                userMenuDropdown.classList.remove('hidden');
                console.log('User menu dropdown shown');
            } else {
                userMenuDropdown.classList.add('hidden');
                console.log('User menu dropdown hidden');
            }
        });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        console.log('Document clicked');
        
        // Close notification dropdown
        if (notificationDropdown && !notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
            notificationDropdown.classList.add('hidden');
            console.log('Notification dropdown closed by outside click');
        }
        
        // Close user menu dropdown
        if (userMenuDropdown && !userMenuBtn.contains(e.target) && !userMenuDropdown.contains(e.target)) {
            userMenuDropdown.classList.add('hidden');
            console.log('User menu dropdown closed by outside click');
        }
    });
    
    console.log('Menu test initialization completed');
}); 