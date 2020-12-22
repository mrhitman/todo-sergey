import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsBoolean()
  readonly isDone?: boolean;
}
