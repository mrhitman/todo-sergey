import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsNumber()
  readonly id: number;

  @IsNumber()
  @IsOptional()
  readonly price: number;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly isDone?: boolean;
}
