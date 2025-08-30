import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

export interface BookingRecord {
  id: string;
  orderId: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  preferenceId?: string;
  mercadoPagoUrl?: string;
  paymentStatus?: 'pending' | 'approved' | 'rejected' | 'cancelled' | 'in_process' | 'authorized' | 'refunded' | 'charged_back';
  createdAt: string;
  updatedAt: string;
  n8nSent: boolean;
  mercadoPagoData?: any;
}

class BookingStorage {
  private dataPath: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'data');
  }

  private async ensureDataDir(): Promise<void> {
    try {
      await fs.mkdir(this.dataPath, { recursive: true });
    } catch (error) {
      console.warn('Data directory creation warning:', error);
    }
  }

  private getFilePath(orderId: string): string {
    return path.join(this.dataPath, `booking-${orderId}.json`);
  }

  async saveBooking(bookingData: {
    name: string;
    phone: string;
    email: string;
    service: string;
  }): Promise<BookingRecord> {
    await this.ensureDataDir();

    const orderId = uuidv4();
    const record: BookingRecord = {
      id: uuidv4(),
      orderId,
      name: bookingData.name,
      phone: bookingData.phone,
      email: bookingData.email,
      service: bookingData.service,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      n8nSent: false
    };

    try {
      await fs.writeFile(
        this.getFilePath(orderId),
        JSON.stringify(record, null, 2),
        'utf-8'
      );
      
      console.log('Booking saved:', orderId);
      return record;
    } catch (error) {
      console.error('Error saving booking:', error);
      throw new Error('Failed to save booking data');
    }
  }

  async getBooking(orderId: string): Promise<BookingRecord | null> {
    try {
      const data = await fs.readFile(this.getFilePath(orderId), 'utf-8');
      return JSON.parse(data) as BookingRecord;
    } catch (error) {
      console.error('Error reading booking:', orderId, error);
      return null;
    }
  }

  async getBookingByExternalReference(externalRef: string): Promise<BookingRecord | null> {
    try {
      // external_reference в MercadoPago = наш orderId
      return await this.getBooking(externalRef);
    } catch (error) {
      console.error('Error finding booking by external reference:', externalRef, error);
      return null;
    }
  }

  async updateBooking(
    orderId: string, 
    updates: Partial<BookingRecord>
  ): Promise<BookingRecord | null> {
    const existing = await this.getBooking(orderId);
    
    if (!existing) {
      console.error('Booking not found for update:', orderId);
      return null;
    }

    const updated: BookingRecord = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    try {
      await fs.writeFile(
        this.getFilePath(orderId),
        JSON.stringify(updated, null, 2),
        'utf-8'
      );
      
      console.log('Booking updated:', orderId);
      return updated;
    } catch (error) {
      console.error('Error updating booking:', error);
      return null;
    }
  }

  async getPendingBookings(olderThanMinutes: number = 60): Promise<BookingRecord[]> {
    await this.ensureDataDir();
    
    try {
      const allBookings = await this.getAllBookings();
      const cutoffTime = new Date(Date.now() - olderThanMinutes * 60 * 1000);
      
      return allBookings.filter(booking => {
        const createdAt = new Date(booking.createdAt);
        const isPending = !booking.paymentStatus || 
                         booking.paymentStatus === 'pending' || 
                         booking.paymentStatus === 'in_process';
        const isOld = createdAt < cutoffTime;
        
        return isPending && isOld;
      });
    } catch (error) {
      console.error('Error getting pending bookings:', error);
      return [];
    }
  }

  async getAllBookings(): Promise<BookingRecord[]> {
    await this.ensureDataDir();
    
    try {
      const files = await fs.readdir(this.dataPath);
      const bookingFiles = files.filter(file => file.startsWith('booking-') && file.endsWith('.json'));
      
      const bookings: BookingRecord[] = [];
      
      for (const file of bookingFiles) {
        try {
          const data = await fs.readFile(path.join(this.dataPath, file), 'utf-8');
          bookings.push(JSON.parse(data));
        } catch (error) {
          console.warn('Error reading booking file:', file, error);
        }
      }
      
      return bookings.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('Error reading bookings directory:', error);
      return [];
    }
  }
}

export const bookingStorage = new BookingStorage();
