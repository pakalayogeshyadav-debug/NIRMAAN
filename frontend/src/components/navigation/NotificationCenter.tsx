import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Check } from 'lucide-react';
import { notificationService } from '@/services/notificationService';
import type { Notification } from '@/services/notificationService';
import { useAuth } from '@/hooks/useAuth';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useAuth();
  const { basePath } = useAppNavigation();
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchNotifs = async () => {
      const data = await notificationService.getNotifications(user?.accountType);
      setNotifications(data);
    };
    fetchNotifs();
  }, [user?.accountType]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current && 
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
    
    // Navigate if path exists
    if (notification.targetPath) {
      setIsOpen(false);
      navigate(`${basePath}${notification.targetPath}`);
    }
  };

  const getIndicatorColor = (type: string) => {
    switch(type) {
      case 'waste': return 'bg-accent-terracotta';
      case 'cleanup': return 'bg-accent-saffron';
      case 'verified': return 'bg-nirmaan-green';
      case 'funding': return 'bg-blue-500';
      default: return 'bg-border-default';
    }
  };

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-colors relative ${isOpen ? 'bg-surface-soft text-text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-soft'}`}
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-terracotta rounded-full border border-surface-primary" />
        )}
      </button>

      {isOpen && (
        <div 
          ref={panelRef}
          className="absolute top-full right-0 mt-2 w-80 sm:w-96 max-h-[80vh] bg-surface-primary border border-border-default rounded-xl shadow-lg z-50 flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-border-default flex items-center justify-between bg-surface-primary">
            <h3 className="font-bold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-xs font-medium text-text-secondary hover:text-nirmaan-green transition-colors flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Mark all as read
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-text-secondary">
                <Bell className="w-8 h-8 mx-auto mb-3 text-text-tertiary opacity-50" />
                <p className="font-bold text-text-primary mb-1 text-sm">No notifications</p>
                <p className="text-xs">You're all caught up.</p>
              </div>
            ) : (
              <div className="divide-y divide-border-default">
                {notifications.map(notification => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left p-4 hover:bg-surface-soft transition-colors flex gap-3 ${!notification.read ? 'bg-nirmaan-green/5' : ''}`}
                  >
                    <div className="shrink-0 mt-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${!notification.read ? getIndicatorColor(notification.type) : 'bg-transparent border border-border-default'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm mb-0.5 ${!notification.read ? 'font-bold text-text-primary' : 'font-medium text-text-secondary'}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-text-secondary line-clamp-2 mb-1.5">
                        {notification.message}
                      </p>
                      <p className="text-[10px] font-medium text-text-tertiary uppercase tracking-wider">
                        {notification.time}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
