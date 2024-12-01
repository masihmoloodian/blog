import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 1,
  })
  @Type(() => Number)
  @Min(1)
  @Max(1000)
  readonly page: number = 1;

  @ApiPropertyOptional({
    example: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @Max(50)
  readonly limit: number = 10;
}
