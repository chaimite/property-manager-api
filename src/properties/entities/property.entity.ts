import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PropertyStatus, PropertyType } from '../enums/property.enums';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

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
}
