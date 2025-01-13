import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Highscore {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 64 })
    name: string;

    @Column({ type: 'int' })
    score: number;
}
