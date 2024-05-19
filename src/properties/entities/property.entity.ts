import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PropertyStatus, PropertyType } from '../enums/property.enums';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 90 })
  description: string;

  @Column({ type: 'enum', enum: PropertyType })
  type: PropertyType;

  @Column({ type: 'enum', enum: PropertyStatus })
  status: PropertyStatus;

  @Column({ type: 'varchar', length: 25 })
  location: string;

  @Column({ type: 'date' })
  contract_begin_at: Date;

  @Column({ type: 'date' })
  contract_ending_at: Date;

  @BeforeInsert()
  generateId() {
    if (this.id) {
      this.id = uuidv4();
    }
  }
}
