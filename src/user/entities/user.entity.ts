import { Profile } from 'src/profile/entities/profile.entity';
import * as bcrypt from 'bcrypt';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Relation,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @BeforeInsert()
  async hashPassword() {
    console.log('hashing password...');
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT),
    );
  }

  @Column({ select: false })
  password: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Relation<Profile>;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
