export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'waste' | 'cleanup' | 'verified' | 'funding' | 'system';
  targetPath?: string;
}

const mockUserNotifications: Notification[] = [
  {
    id: 'un1',
    title: 'New waste activity nearby',
    message: 'A high-priority report was submitted near Adyar.',
    time: '2 hours ago',
    read: false,
    type: 'waste',
    targetPath: '/activity'
  },
  {
    id: 'un2',
    title: 'Cleanup drive reminder',
    message: 'Adyar Community Cleanup starts tomorrow.',
    time: '5 hours ago',
    read: false,
    type: 'cleanup',
    targetPath: '/drives'
  },
  {
    id: 'un3',
    title: 'Report verified',
    message: 'Your submitted waste report has been verified.',
    time: 'Yesterday',
    read: true,
    type: 'verified',
    targetPath: '/impact'
  },
  {
    id: 'un4',
    title: 'Cleanup verified',
    message: 'Your cleanup evidence has been reviewed.',
    time: '2 days ago',
    read: true,
    type: 'verified',
    targetPath: '/impact'
  }
];

const mockOrgNotifications: Notification[] = [
  {
    id: 'on1',
    title: 'High-priority hotspot detected',
    message: '12 reports recorded in Guindy over the last 30 days.',
    time: '1 hour ago',
    read: false,
    type: 'waste',
    targetPath: '/waste-activity'
  },
  {
    id: 'on2',
    title: 'New volunteer joined',
    message: 'A volunteer joined your Adyar cleanup drive.',
    time: '3 hours ago',
    read: false,
    type: 'cleanup',
    targetPath: '/drives'
  },
  {
    id: 'on3',
    title: 'Cleanup evidence submitted',
    message: 'A cleanup participant submitted before/after evidence.',
    time: 'Yesterday',
    read: true,
    type: 'verified',
    targetPath: '/drives'
  },
  {
    id: 'on4',
    title: 'Funding activity',
    message: 'A sponsored cleanup allocation was updated.',
    time: '2 days ago',
    read: true,
    type: 'funding',
    targetPath: '/funding'
  }
];

export const notificationService = {
  async getNotifications(accountType: string = 'USER'): Promise<Notification[]> {
    if (accountType === 'ORGANIZATION') {
      return [...mockOrgNotifications];
    }
    return [...mockUserNotifications];
  }
};
