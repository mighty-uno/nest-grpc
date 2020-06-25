import { Controller, Get, Param, Inject, OnModuleInit } from '@nestjs/common';
import { GrpcMethod, ClientGrpc } from '@nestjs/microservices';

export interface HeroById {
  id: number;
}
export interface Hero {
  id: number;
  name: string;
}

interface HeroService {
  findOne(data: HeroById): Hero;
  // findMany(upstream: Observable<HeroById>): Observable<Hero>;
}

@Controller('hero')
export class HeroController implements OnModuleInit {
  private heroService: HeroService;

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }
  @Get(':id')
  getById(@Param('id') id: string): Hero {
    return this.heroService.findOne({ id: +id });
  }

  @GrpcMethod('HeroService', 'FindOne')
  findOne(data: HeroById): Hero {
    const items: Hero[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
