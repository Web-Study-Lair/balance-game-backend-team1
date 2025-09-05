import { Exclude } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChoiceDto {
    @Exclude()
    index: number;
    
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsNotEmpty({ message: '모든 선택지에 설명을 추가해주세요.'})
    @IsString()
    description?: string;

    @IsOptional()
    @IsInt()
    count: number = 0;
}