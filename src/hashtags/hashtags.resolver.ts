import { Resolver } from '@nestjs/graphql';
import { Hashtag } from './entity/Hashtag.entity';

@Resolver(() => Hashtag)
export class HashtagsResolver {}
