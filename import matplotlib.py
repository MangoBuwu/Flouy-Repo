import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# --- 1. Creación de datos de ejemplo ---
# Datos que cumplen con las condiciones solicitadas.
sales_2024 = [120, 130, 150, 145, 160, 180, 175, 190, 185, 200, 210, 230]
# 2025: Ligero aumento, con un pico significativo en Febrero
sales_2025 = [125, 210, 158, 155, 170, 195] # Febrero (210) es mucho mayor que en 2024 (130)

# Meses en los tres idiomas
months_es = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
months_en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
months_pt = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

# Creamos un DataFrame unificado para que Seaborn trabaje mejor
data = {
    'Mes_Num': list(range(1, 13)) + list(range(1, 7)),
    'Año': [2024] * 12 + [2025] * 6,
    'Ventas': sales_2024 + sales_2025
}
df_sales = pd.DataFrame(data)


# --- 2. Función para crear el gráfico (para no repetir código) ---
def create_sales_chart(df, lang='es'):
    """
    Crea un gráfico de líneas de ventas con personalización avanzada.
    lang: 'es' para español, 'en' para inglés, 'pt' para portugués.
    """
    # Configuraciones según el idioma
    if lang == 'es':
        title = "Ventas 2024 vs Ventas 2025"
        subtitle = "Comparativa de ventas mensuales año contra año.\n2025 muestra un crecimiento, con un pico notable en febrero."
        x_label = "Mes"
        y_label = "Ventas (en miles)"
        months = months_es
        legend_labels = ['Ventas 2024', 'Ventas 2025']
    elif lang == 'pt':
        title = "Vendas 2024 vs Vendas 2025"
        subtitle = "Comparação de vendas mensais ano contra ano.\n2025 mostra crescimento, com pico notável em fevereiro."
        x_label = "Mês"
        y_label = "Vendas (em milhares)"
        months = months_pt
        legend_labels = ['Vendas 2024', 'Vendas 2025']
    else:
        title = "Sales 2024 vs Sales 2025"
        subtitle = "Year-over-year monthly sales comparison.\n2025 shows growth with a significant peak in February."
        x_label = "Month"
        y_label = "Sales (in thousands)"
        months = months_en
        legend_labels = ['Sales 2024', 'Sales 2025']

    # --- Creación y estilo del gráfico ---
    fig, ax = plt.subplots(figsize=(14, 8))
    
    # Colores de fondo
    fig.set_facecolor('#333333')
    ax.set_facecolor('#333333')

    # Gráfico de líneas con Seaborn
    sns.lineplot(
        data=df,
        x='Mes_Num',
        y='Ventas',
        hue='Año',
        palette={2024: 'royalblue', 2025: 'yellow'}, # Colores de línea solicitados
        marker='o',
        linewidth=2.5,
        ax=ax
    )

    # --- Títulos y subtítulos ---
    fig.suptitle(title, fontsize=20, color='white', y=0.94)
    ax.set_title(subtitle, fontsize=12, color='lightgray', pad=20)

    # --- Estilo de ejes y grid ---
    ax.set_xlabel(x_label, color='white', fontsize=12, labelpad=15)
    ax.set_ylabel(y_label, color='white', fontsize=12, labelpad=15)
    
    # Personalizar los ticks del eje X para que muestren los nombres de los meses
    ax.set_xticks(ticks=range(1, 13))
    ax.set_xticklabels(months, color='white')
    
    # Cambiar color de los ticks del eje Y
    ax.tick_params(axis='y', colors='white')
    
    # Cambiar color de los bordes del gráfico
    for spine in ax.spines.values():
        spine.set_edgecolor('white')

    # Configurar el grid como se solicitó
    ax.grid(True, which='both', linestyle='--', linewidth=0.5, alpha=0.4)
    
    # --- Leyenda personalizada (debajo del gráfico) ---
    # Obtenemos los manejadores y etiquetas de la leyenda actual para crear una nueva
    handles, _ = ax.get_legend_handles_labels()
    ax.get_legend().remove() # Eliminamos la leyenda por defecto de dentro del gráfico

    fig.legend(
        handles,
        legend_labels,
        loc='lower center',          # Posición de la ancla de la leyenda
        bbox_to_anchor=(0.5, -0.01), # Coloca la leyenda en el centro horizontal y justo debajo
        ncol=2,                      # Número de columnas
        frameon=False,               # Sin marco
        fontsize=12,
        labelcolor='white'
    )
    
    # Ajustar el layout para que la leyenda y títulos no se solapen
    plt.tight_layout(rect=(0, 0.05, 1, 0.95)) # Deja espacio en la parte inferior (bottom=0.05)
    
    plt.show()


# --- 3. Generar y mostrar los tres gráficos ---
print("Generando gráfico en Español...")
create_sales_chart(df_sales, lang='es')

print("\nGenerando gráfico en Inglés...")
create_sales_chart(df_sales, lang='en')

print("\nGenerando gráfico en Portugués...")
create_sales_chart(df_sales, lang='pt')