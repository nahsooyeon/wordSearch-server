import {
    IsAlphanumeric,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class CreateHighscoreDto {
    @IsInt()
    id: number;

    @IsNotEmpty()
    @MinLength(3, { message: 'name must have at least 3 characters.' })
    @IsAlphanumeric(null, { message: 'name must only have alpha-numeric characters.'})
    name: string;

    @IsNotEmpty()
    @IsInt()
    score: number;
}
