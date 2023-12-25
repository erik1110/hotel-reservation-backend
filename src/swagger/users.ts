import { ApiProperty } from "@nestjs/swagger"

export class RegisterSuccess {
    @ApiProperty({ example: true})
    status: boolean;

    @ApiProperty({ example: 'eyJhbGciOiJI'})
    token: string;

    @ApiProperty({ example: {
        address: {
          zipcode: 802,
          detail: '文山路23號',
          county: '高雄市',
          city: '苓雅區',
        },
        _id: '6533f0ef4cdf5b7f762747b0',
        name: 'Lori Murphy',
        email: 'timmothy.ramos@example.com',
        phone: '(663) 742-3828',
        birthday: '1982-02-03T16:00:00.000Z',
        createdAt: '2023-10-21T15:40:31.526Z',
        updatedAt: '2023-10-21T15:40:31.526Z',
        id: '6533f0ef4cdf5b7f762747b0',
      }
    })
    result: object;
}
