import * as borsh from '@project-serum/borsh'

const equipPlayerSchema = borsh.struct([
    borsh.u8('variant'),
    borsh.u16('playerId'),

])

const buffer = Buffer.alloc(1000)
equipPlayerSchema.encode({variant: 2, playerId: 1234}, buffer)

const instructionBuffer = buffer.slice(0, equipPlayerSchema.getSpan(buffer))