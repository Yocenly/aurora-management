<script>
// import * as echarts from 'echarts';
import { getHomeCountData, getHomeOptionData } from '@/api'
export default {
  name: 'HomePage',
  created () {
    this.getCountData();
    this.getOptionData();
  },
  mounted () {
    // this.initChart('viewLineChart', this.viewLineChartOptions);
    // this.initChart('userBarChart', this.userBarChartOptions);
    // this.initChart('codePieChart', this.codePieChartOptions);
  },
  data () {
    return {
      viewCount: 0,
      userCount: 0,
      articleCount: 0,
      messageCount: 0,
      loading: true,
      viewLineChartOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          }
        },
        color: ['#3888fa'],
        legend: {
          data: ['访问量'],
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '0%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          data: ['2023-5-1', '2023-5-2', '2023-5-3', '2023-5-4', '2023-5-5'],
          axisLine: {
            lineStyle: {
              color: '#666',
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#666',
            }
          }
        },
        series: {
          name: '访问量',
          type: 'line',
          symbol: 'emptycircle',
          symbolSize: 8,
          data: [10, 52, 200, 334, 390],
          smooth: true,
        }
      },
      userBarChartOptions: {
        xAxis: {
          data: ['浙江', '安徽', '上海', '重庆', '北京'],
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#666',
            },
          },
        },
        series: {
          type: 'bar',
          name: '用户人数',
          data: [1235, 1889, 3412, 1931, 244]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          }
        },
        legend: {
          data: ['用户人数'],
        },
        grid: {
          top: '10%',
          right: '0%',
          bottom: '0%',
          left: '0%',
          containLabel: true,
        },
      },
      codePieChartOptions: {
        grid: {
          top: '10%',
          right: '0%',
          bottom: '0%',
          left: '0%',
          containLabel: true,
        },
        tooltip: {},
        legend: {
          top: '85%',
          data: ['Java', 'Python', 'Javascript', 'C', 'C++'],
        },
        series: {
          type: 'pie',
          height: '70%',
          data: [
            {
              value: 100,
              name: 'Java'
            },
            {
              value: 200,
              name: 'Python'
            },
            {
              value: 300,
              name: 'Javascript'
            },
            {
              value: 400,
              name: 'C'
            },
            {
              value: 500,
              name: 'C++'
            }
          ],
          roseType: 'area'
        }
      },
    };
  },
  methods: {
    getCountData () {
      getHomeCountData().then(({ data }) => {
        for (let countName in data.message) {
          this[countName] = data.message[countName]
        }
      });
    },
    getOptionData () {
      getHomeOptionData().then(({ data }) => {
        let viewChart = data.message.viewChart;
        this.viewLineChartOptions.xAxis.data = viewChart.xAxis;
        this.viewLineChartOptions.series.data = viewChart.data;

        let userChart = data.message.userChart;
        this.userBarChartOptions.xAxis.data = userChart.xAxis;
        this.userBarChartOptions.series.data = userChart.data;

        let codeChart = data.message.codeChart;
        this.codePieChartOptions.series.data = codeChart.data;
        this.loading = false;
        // this.resetChart('viewLineChart', this.viewLineChartOptions);
        // this.resetChart('userBarChart', this.userBarChartOptions);
        // this.resetChart('codePieChart', this.codePieChartOptions);
      });
    },
    // initChart (chartRef, options) {
    //   this[chartRef] = echarts.init(this.$refs[chartRef]);
    //   this[chartRef].setOption(options, true);
    // },
    // resetChart (chartRef, options) {
    //   this[chartRef].clear();
    //   this[chartRef].setOption(options, true);
    // }
  },
}
</script>

<template>
  <div>
    <!-- 统计量卡片 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-s-promotion" style="color: #40c9c6" />
          </div>
          <div class="card-desc">
            <div class="card-title">访问量</div>
            <div class="card-count">{{ viewCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-user-solid" style="color: #34bfa3" />
          </div>
          <div class="card-desc">
            <div class="card-title">用户量</div>
            <div class="card-count">{{ userCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-document" style="color: #f4516c" />
          </div>
          <div class="card-desc">
            <div class="card-title">文章量</div>
            <div class="card-count">{{ articleCount }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-icon-container">
            <i class="el-icon-chat-line-round" style="color: #36a3f7" />
          </div>
          <div class="card-desc">
            <div class="card-title">留言量</div>
            <div class="card-count">{{ messageCount }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 一周访问量曲线图 -->
    <el-row>
      <el-card>
        <span class="e-title">一周访问量</span>
        <!-- <div ref="viewLineChart" style="height: 350px;" v-loading="loading"></div> -->
        <div style="height: 350px;">
          <v-chart :option="viewLineChartOptions" v-loading="loading" autoresize></v-chart>
        </div>
      </el-card>
    </el-row>
    <!-- 柱状图及饼图 -->
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <span class="e-title">用户属地</span>
          <!-- <div ref="userBarChart" style="height: 350px;" v-loading="loading"></div> -->
          <div style="height: 350px;">
            <v-chart :option="userBarChartOptions" v-loading="loading" autoresize></v-chart>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <span class="e-title">代码构成</span>
          <!-- <div ref="codePieChart" style="height: 350px;" v-loading="loading"></div> -->
          <div style="height: 350px;">
            <v-chart :option="codePieChartOptions" v-loading="loading" autoresize></v-chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="less">
@import "../style/index.less";
</style>
