const supabase = require('../config/supabaseClient');

async function getTendersByMonth(start, end) {
    const startYear = Math.floor(start / 100);
    const startMonth = start % 100;
    const endYear = Math.floor(end / 100);
    const endMonth = end % 100;

    let query = supabase.from('tendersmonth').select('*');

    if (startYear === endYear) {
        // Caso em que o ano inicial e final são o mesmo
        query = query
            .eq('year', startYear)
            .gte('month', startMonth)
            .lte('month', endMonth);
    } else {
        // Caso em que o ano inicial e final são diferentes
        query = query
            .or(
                `and(year.eq.${startYear},month.gte.${startMonth}),` +   // Meses do ano inicial
                `and(year.eq.${endYear},month.lte.${endMonth}),` +      // Meses do ano final
                `and(year.gt.${startYear},year.lt.${endYear})`          // Todos os anos intermediários
            );
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }
    
    return data;
}

module.exports = {
    getTendersByMonth,
};

