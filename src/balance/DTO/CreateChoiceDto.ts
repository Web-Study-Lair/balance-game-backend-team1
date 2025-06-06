import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateChoiceDto {
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsNotEmpty({ message: '모든 선택지에 설명을 추가해주세요.'})
    @IsString()
    description: string;
}