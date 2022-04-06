import bcrypt from 'bcrypt'
import { BaseHelper } from '@/core/BaseHelper'

export class HashPasswordHelper extends BaseHelper<string, string> {
  async run(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    return hash
  }
}