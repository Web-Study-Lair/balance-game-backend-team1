import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateChoiceDto } from './CreateChoiceDto';

export class CreateGameDto {
    @IsString()
    @IsNotEmpty({ message: '제목 입력은 필수입니다.'})
    title: string;

    @ValidateNested({ each: true }) //각 요소마다 유효성 검사
    @Type(() => CreateChoiceDto)
    
    @ArrayMinSize(2) // 최소 2개
    @ArrayMaxSize(2) // 최대 2개(추후 확장 가능)

    choices: CreateChoiceDto[];

}