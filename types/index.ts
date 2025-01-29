export type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  quantity: number;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  userId: string;
  createdAt: Date;
  status: 'available' | 'reserved' | 'claimed';
}

export type ResourceCategory = {
  id: string;
  name: string;
  icon: string;
}