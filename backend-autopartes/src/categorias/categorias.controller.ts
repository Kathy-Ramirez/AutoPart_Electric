import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('categorias')
export class CategoriasController {
  constructor(
    private readonly categoriasService: CategoriasService,
  ) {}

  // =========================
  // CREAR CATEGORÍA
  // =========================
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  create(
    @Body() createCategoriaDto: CreateCategoriaDto,
  ) {
    return this.categoriasService.create(
      createCategoriaDto,
    );
  }

  // =========================
  // LISTAR CATEGORÍAS
  // =========================
  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  // =========================
  // OBTENER POR ID
  // =========================
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(+id);
  }

  // =========================
  // ACTUALIZAR
  // =========================
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(
      +id,
      updateCategoriaDto,
    );
  }

  // =========================
  // ELIMINACIÓN LÓGICA
  // =========================
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMINISTRADOR')
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(+id);
  }
}