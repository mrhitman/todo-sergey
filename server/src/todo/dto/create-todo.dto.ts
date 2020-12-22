import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsBoolean()
  readonly isDone?: boolean;
}
